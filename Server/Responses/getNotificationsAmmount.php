<?php

  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/notificationController.php';
  //header('Content-Type: text/javascript');

  if(isset($_POST['ammount'])){

    $notificationControllerObject = new NotificationController();
    $ammount = $_POST['ammount'];
    $response = $notificationControllerObject->getNotificationsAmmount($ammount);

    echo $response;

    //echo json_encode($response, JSON_PRETTY_PRINT);
  }



?>
