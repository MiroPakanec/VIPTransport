<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/orderController.php';

if(isset($_POST['orderId'], $_POST['transporter'], $_POST['car'])){


  $countryCodes = array();
  if(isset($_POST['countryCodes']))
    $countryCodes = $_POST['countryCodes'];

  $orderControllerObject = new orderController();
  $responseArray = $orderControllerObject->submitOrder($_POST['orderId'], $_POST['transporter'], $_POST['car'], $countryCodes);
  echo json_encode($responseArray);
}




?>
