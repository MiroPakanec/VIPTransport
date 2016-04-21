<?php

  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/notificationController.php';
  header('Content-Type: text/javascript');

  if(isset($_POST['ammount']) && isset($_POST['skip']) && isset($_POST['type'])){

    $notificationControllerObject = new NotificationController();
    $ammount = $_POST['ammount'];
    $skip = $_POST['skip'];
    $type = $_POST['type'];
    $response = $notificationControllerObject->getNotifications(intval($ammount), intval($skip), $type);

    echo json_encode($response, JSON_PRETTY_PRINT);
    //echo $response;
  }



?>
