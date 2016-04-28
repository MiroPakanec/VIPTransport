<?php

    require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/orderController.php';

    $id = $email = $dateFrom = $dateTo = '';

    $id = $_POST['id'];
    $email = $_POST['email'];
    $dateFrom = $_POST['dateFrom'];
    $dateTo = $_POST['dateTo'];

    $orderControllerObject = new OrderController();
    $orderModelArray = $orderControllerObject->getOrders($id, $email, $dateFrom, $dateTo);

    header('Content-Type: text/javascript');

    $index = 0;
    $array = array();
    $arrayOrder = array();

    foreach ($orderModelArray as $orderModelObject) {

      $arrayOrder['id'] = $orderModelObject->getId();
      $arrayOrder['email'] = $orderModelObject->getEmail();
      $arrayOrder['date'] = $orderModelObject->getDate()->format('d/m/Y h:i:s A');
      $arrayOrder['from'] = $orderModelObject->getFrom();
      $arrayOrder['to'] = $orderModelObject->getTo();
      $arrayOrder['payment'] = $orderModelObject->getPayment();
      $arrayOrder['phone'] = $orderModelObject->getPhone();
      $arrayOrder['pasangers'] = $orderModelObject->getPasangers();
      $arrayOrder['creationDate'] = $orderModelObject->getCreationDate();
      $arrayOrder['status'] = $orderModelObject->getStatus();
      $arrayOrder['type'] = $_SESSION['type'];

      array_push($array, $arrayOrder);
    }

    echo json_encode($array, JSON_PRETTY_PRINT);

?>
