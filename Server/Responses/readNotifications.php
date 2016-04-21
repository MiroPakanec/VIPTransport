<?php

  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/notificationController.php';

  if(isset($_POST['id']) && isset($_POST['value'])){

    $notificationControllerObject = new NotificationController();
    $response = $notificationControllerObject->readNotifications($_POST['id'], $_POST['value']);

    echo $response;
  }
?>
