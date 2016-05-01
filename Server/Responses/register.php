<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';

  if(isset($_POST['email'], $_POST['firstName'], $_POST['middleName'], $_POST['lastName'],
          $_POST['password'], $_POST['phone'])){

    $type = 'customer';
    if(isset($_POST['type']))
      $type = $_POST['type'];

    $userControllerObject = new UserController();
    $response = $userControllerObject->registerUser(
        $_POST['email'],
        $_POST['firstName'],
        $_POST['middleName'],
        $_POST['lastName'],
        $_POST['password'],
        $_POST['phone'],
        $type
  );

  //response to client
  echo $response;
}

?>
