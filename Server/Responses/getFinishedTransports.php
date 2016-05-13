<?php

    require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/orderController.php';
    header('Content-Type: text/javascript');

    $orderControllerObject = new OrderController();
    $orderModelArray = $orderControllerObject->getFinishedOrders();
    $array = $orderControllerObject->orderModelArrayToArray($orderModelArray);

    echo json_encode($array, JSON_PRETTY_PRINT);
?>
