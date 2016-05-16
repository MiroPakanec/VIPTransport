<?php

  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';

  if(isset($_POST['email'])){

    $sessionControllerObject = new SessionController();
    if(!$sessionControllerObject->sessionStarted())
      $sessionControllerObject->startSession();

    $email = trim($_POST['email']);
    if($_POST['email'] === 'session')
      $email = $_SESSION['email'];

    $userControllerObject = new UserController();
    $image = $userControllerObject->getImage($email);

    echo 'data:image/jpeg;base64,'.base64_encode($image);
  }
?>
