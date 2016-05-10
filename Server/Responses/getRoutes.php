<?php

    require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/routeController.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/routeModel.php';
    header('Content-Type: text/javascript');

    $routesControllerObject = new RouteController();
    $id = $email = $orderId = '';

    if(!empty($_GET['email']))
      $email = $_GET['email'];

    if(!empty($_GET['orderId']))
      $orderId = $_GET['orderId'];

    if(!empty($_GET['id']))
      $id = $_GET['id'];

    $routesArray = $routesControllerObject->getRoutes($id, $email, $orderId);

    echo json_encode($routesArray, JSON_PRETTY_PRINT);
?>
