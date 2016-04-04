<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';


  if(isset($_POST['email'],$_POST['password'], $_POST['token']) && $_SESSION['token'] == $_POST['token']){

    $userControllerObject = new UserController();
    $sessionControllerObject = new SessionController();
    $response = $userControllerObject->loginUser(
        $_POST['email'],
        $_POST['password'],
        $_POST['token']
      );

    if($response == 'in')
      $sessionControllerObject->setSessionData($_POST['email']);

    //response to client
    echo $response;
  }

?>
