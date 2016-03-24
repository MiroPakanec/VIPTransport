<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderInsertDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderSelectDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';

  class OrderController{

    public function crearteOrder($date, $timeHour, $timeMinute, $clock, $from, $to, $pasangers, $payment, $names){

      session_start();
      $datetimeString = $date." ".$timeHour.":".$timeMinute.":00 ".$clock;
      $datetime = Datetime::createFromFormat('d/m/Y H:i:s A', $datetimeString);

      $orderModelObject = new OrderModel('', $_SESSION['email'], $datetime, $from, $to, $pasangers, $payment, $names, '');
      $orderInsertDatabaseAccessObject = new OrderInsertDatabaseAccess();
      $orderSelectDatabaseAccessObject = new OrderSelectDatabaseAccess();
      $wClause = ' ORDER BY id DESC LIMIT 0, 1';

      //ID is returned from DAL and set to model object
      $orderModelObject->setId($orderInsertDatabaseAccessObject->createOrder($orderModelObject));

      if(!$orderModelObject->getId() > 0)
        return 0;

      //return response from DAL insertion to Pasangers table
      return $orderInsertDatabaseAccessObject->createOrderNames($orderModelObject);
    }
  }

?>
