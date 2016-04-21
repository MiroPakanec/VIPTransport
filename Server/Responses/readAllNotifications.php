<?php

  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/notificationController.php';


  $notificationControllerObject = new NotificationController();
  $response = $notificationControllerObject->readAllNotifications();

  echo $response;
?>
