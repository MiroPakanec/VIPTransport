<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderInsertDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';

  class OrderController{

    public function crearteOrder($date, $timeHour, $timeMinute, $clock, $from, $to, $pasangers, $payment, $names){

      session_start();
      $datetimeString = $date." ".$timeHour.":".$timeMinute.":00 ".$clock;
      $datetime = Datetime::createFromFormat('d/m/Y H:i:s A', $datetimeString);

      $orderModelObject = new OrderModel($datetime, $_SESSION['email'], $from, $to, $pasangers, $payment, $names);
      $orderDatabaseAccessObject = new OrderInsertDatabaseAccess();
      return $orderDatabaseAccessObject->crearteOrder($orderModelObject);
    }
  }

?>
