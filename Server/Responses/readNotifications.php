<?php

  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/notificationController.php';

  $notificationControllerObject = new NotificationController();
  $response = $notificationControllerObject->readNotifications();

  echo $response;

?>
