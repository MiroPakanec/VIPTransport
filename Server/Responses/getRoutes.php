<?php

    require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/routeController.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/routeModel.php';
    header('Content-Type: text/javascript');

    $routesControllerObject = new RouteController();
    $email = '';

    if(!empty($_GET['email']))
      $email = $_GET['email'];

    $routesArray = $routesControllerObject->getRoutes($_GET['email']);

    echo json_encode($routesArray, JSON_PRETTY_PRINT);
?>
