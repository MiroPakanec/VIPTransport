<?php

  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';

  $sessionControllerObject = new SessionController();
  $sessionControllerObject->endSession();

  if($sessionControllerObject->sessionStarted() === FALSE)
    echo 1;
  else
    echo 0;

?>
