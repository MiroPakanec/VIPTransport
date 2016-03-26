<?php

    require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/orderController.php';

    $id = '';

    if(isset($_POST['id'])){
      $id = $_POST['id'];
    }

    $orderControllerObject = new OrderController();
    $orderModelArray = $orderControllerObject->getOrders($id);

    header('Content-Type: text/javascript');
    //test
    $index = 0;
    $array = array();
    $arrayOrder = array();

    foreach ($orderModelArray as $orderModelObject) {

      $arrayOrder['id'] = $orderModelObject->getId();
      $arrayOrder['date'] = $orderModelObject->getDate()->format('d/m/Y h:i:s A');
      $arrayOrder['from'] = $orderModelObject->getFrom();
      $arrayOrder['to'] = $orderModelObject->getTo();
      $arrayOrder['payment'] = $orderModelObject->getPayment();
      $arrayOrder['pasangers'] = $orderModelObject->getPasangers();
      $arrayOrder['creationDate'] = $orderModelObject->getCreationDate();

      array_push($array, $arrayOrder);
    }

    echo json_encode($array, JSON_PRETTY_PRINT);

?>
