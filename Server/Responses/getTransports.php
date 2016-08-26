<?php

    require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/orderController.php';
    header('Content-Type: text/javascript');
    session_start();

    //if(!isset($_POST['token']))
      //return;

    //if($_POST['token'] != $_SESSION['token'])
      //return;

    $id = $email = $dateFrom = $dateTo = '';

    $id = $_POST['id'];
    $email = $_POST['email'];
    $dateFrom = $_POST['dateFrom'];
    $dateTo = $_POST['dateTo'];

    $orderControllerObject = new OrderController();
    $orderModelArray = $orderControllerObject->getOrders($id, $email, $dateFrom, $dateTo);
    $array = $orderControllerObject->orderModelArrayToArray($orderModelArray);

    echo json_encode($array, JSON_PRETTY_PRINT);

?>
