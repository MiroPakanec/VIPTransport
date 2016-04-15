<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderInsertDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderSelectDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderDeleteDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderUpdateDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/validationController.php';

  session_start();

  class OrderController{

    public function crearteOrder($date, $timeHour, $timeMinute, $clock, $from, $to, $pasangers, $payment, $phone, $names){

      $validationControllerObject = new ValidationController();
      if($this->validateDate($date, $timeHour, $timeMinute, 00, $clock) > 0)
        return 0;

      $datetimeString = $date." ".$timeHour.":".$timeMinute.":00 ".$clock;
      $datetime = Datetime::createFromFormat('d/m/Y H:i:s A', $datetimeString);
      $orderModelObject = new OrderModel('', $_SESSION['email'], $datetime, $from, $to, $pasangers, $payment, $phone, $names, '', '');

      if($validationControllerObject->validateOrder($orderModelObject) > 0)
        return 0;

      $orderInsertDatabaseAccessObject = new OrderInsertDatabaseAccess();
      $wClause = ' ORDER BY id DESC LIMIT 0, 1';

      //ID is returned from DAL and set to model object
      $orderModelObject->setId($orderInsertDatabaseAccessObject->createOrder($orderModelObject));
      if(!$orderModelObject->getId() > 0)
        return 6;

      //return response from DAL insertion to Pasangers table
      return $orderInsertDatabaseAccessObject->createOrderNames($orderModelObject);
    }

    public function updateOrder($id, $date, $timeHour, $timeMinute, $clock, $from, $to, $pasangers, $payment, $phone, $names){

      $validationControllerObject = new ValidationController();
      if($this->validateDate($date, $timeHour, $timeMinute, 00, $clock) > 0)
        return 0;

      $datetimeString = $date." ".$timeHour.":".$timeMinute.":00 ".$clock;
      $datetime = Datetime::createFromFormat('d/m/Y H:i:s A', $datetimeString);
      $orderModelObject = new OrderModel($id, $_SESSION['email'], $datetime, $from, $to, $pasangers, $payment, $phone, $names, '', '');

      if($validationControllerObject->validateOrder($orderModelObject) > 0)
        return 0;

      $orderUpdateDatabaseAccessObject = new OrderUpdateDatabaseAccess();
      return $orderUpdateDatabaseAccessObject->updateOrder($orderModelObject);
    }

    public function getOrders($id){

      $orderSelectDatabaseAccessObject = new OrderSelectDatabaseAccess();
      return $orderSelectDatabaseAccessObject->getOrderData($this->getOrdersWClause($id));
    }

    public function getOrderNames($id){

      $orderSelectDatabaseAccessObject = new OrderSelectDatabaseAccess();
      return $orderSelectDatabaseAccessObject->getOrderNamesData($this->getOrdersNamesWClause($id));
    }

    public function deleteOrder($id){

      $orderDeleteDatabaseAccess = new OrderDeleteDatabaseAccess();
      if(strlen($id) == 0)
        return 0;

      $wClause = "WHERE id = ".$id;
      return $orderDeleteDatabaseAccess->deleteOrder($wClause);
    }

    private function validateDate($date, $hour, $minute, $second, $clock){

      $year = substr($date, 6, 4);
      $month = substr($date, 3, 2);
      $day = substr($date, 0, 2);

      $validationControllerObject = new ValidationController();
      return $validationControllerObject->validateDate($year, $month, $day, $hour, $minute, $second, $clock);
    }

    private function getOrdersWClause($id){

      $wClause = '';
      if($_SESSION['type'] == 'customer'){
         $wClause = " WHERE Email = '".$_SESSION['email']."'";
         if(strlen($id) != 0)
          $wClause .= " AND Id = ".$id;
      }

      return $wClause;
    }

    private function getOrdersNamesWClause($id){

      if(strlen($id) != 0)
          return "WHERE Order_id = ".$id;

      return '';
    }
  }

?>
