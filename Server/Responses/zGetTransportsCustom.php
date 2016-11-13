<?php
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/submitController.php';

    $submitControllerObject = new SubmitController();
    $transports = $submitControllerObject->SelectTransports();

    echo json_encode($transports, JSON_PRETTY_PRINT);
?>
