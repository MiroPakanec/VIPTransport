<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';

  $sessionControllerObject = new SessionController();
  if(!$sessionControllerObject->sessionStarted())
    $sessionControllerObject->startSession();

  if(isset($_POST['email'],$_POST['password'], $_POST['token']) && $_SESSION['token'] == $_POST['token']){
    $userControllerObject = new UserController();
    $sessionControllerObject = new SessionController();
    $response = $userControllerObject->loginUser(
        $_POST['email'],
        $_POST['password'],
        $_POST['token']
      );

    if($response == 1){
      $sessionControllerObject->setSessionData($_POST['email']);
    }


    //response to client
    echo $response;
  }
  else{
    echo 0;
  }

?>
