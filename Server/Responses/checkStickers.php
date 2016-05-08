<?php

    require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/routeController.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/routeModel.php';

    $routesControllerObject = new RouteController();
    $email = '';

    if(isset($_GET['spz'], $_GET['routeId'])){

      $responseMessage = $routesControllerObject->checkCountriesStickers($_GET['spz'], $_GET['routeId']);
    }

    echo $responseMessage;
?>
