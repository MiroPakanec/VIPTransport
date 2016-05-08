<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/orderController.php';

if(isset($_POST['orderId'], $_POST['transporter'], $_POST['car'], $_POST['action'])){


  $countryCodes = array();
  $routeId = '';
  if(isset($_POST['countryCodes']))
    $countryCodes = $_POST['countryCodes'];

  if(isset($_POST['routeId']))
    $routeId = $_POST['routeId'];

  $orderControllerObject = new orderController();
  $responseArray = $orderControllerObject->submitOrder($routeId, $_POST['orderId'], $_POST['transporter'], $_POST['car'], $countryCodes, $_POST['action']);
  echo json_encode($responseArray);
}




?>
