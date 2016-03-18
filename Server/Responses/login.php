<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';


  if(isset($_POST['email'],$_POST['password'], $_POST['token'])){

    $userControllerObject = new UserController();
    $response = $userControllerObject->loginUser(
        $_POST['email'],
        $_POST['password'],
        $_POST['token']
  );

  //response to client
  echo $response;
  }

?>
