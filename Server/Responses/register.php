<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';

  if(isset($_POST['email'], $_POST['firstName'], $_POST['middleName'], $_POST['lastName'],
          $_POST['password'], $_POST['phone'])){

    $userControllerObject = new UserController();
    $response = $userControllerObject->registerUser(
        $_POST['email'],
        $_POST['firstName'],
        $_POST['middleName'],
        $_POST['lastName'],
        $_POST['password'],
        $_POST['phone']
  );

  //response to client
  echo $response;
  }

?>
