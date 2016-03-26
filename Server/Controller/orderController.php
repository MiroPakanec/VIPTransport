<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderInsertDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderSelectDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderDeleteDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';

  session_start();

  class OrderController{

    public function crearteOrder($date, $timeHour, $timeMinute, $clock, $from, $to, $pasangers, $payment, $names){

      $datetimeString = $date." ".$timeHour.":".$timeMinute.":00 ".$clock;
      $datetime = Datetime::createFromFormat('d/m/Y H:i:s A', $datetimeString);

      $orderModelObject = new OrderModel('', $_SESSION['email'], $datetime, $from, $to, $pasangers, $payment, $names, '');
      $orderInsertDatabaseAccessObject = new OrderInsertDatabaseAccess();
      $wClause = ' ORDER BY id DESC LIMIT 0, 1';

      //ID is returned from DAL and set to model object
      $orderModelObject->setId($orderInsertDatabaseAccessObject->createOrder($orderModelObject));

      if(!$orderModelObject->getId() > 0)
        return 0;

      //return response from DAL insertion to Pasangers table
      return $orderInsertDatabaseAccessObject->createOrderNames($orderModelObject);
    }

    public function getOrders(){

      $orderSelectDatabaseAccessObject = new OrderSelectDatabaseAccess();
      return $orderSelectDatabaseAccessObject->getOrderData($this->getOrdersWClause());
    }

    public function deleteOrder($id){

      $orderDeleteDatabaseAccess = new OrderDeleteDatabaseAccess();
      if(strlen($id) == 0)
        return 0;

      $wClause = "WHERE id = ".$id;
      return $orderDeleteDatabaseAccess->deleteOrder($wClause);
    }

    private function getOrdersWClause(){

      if($_SESSION['type'] == 'customer')
        return " WHERE Email = '".$_SESSION['email']."'";
    }
  }

?>
