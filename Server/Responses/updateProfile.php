<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';

if(isset($_POST['email'], $_POST['fname'], $_POST['mname'], $_POST['lname'],
         $_POST['phone'])){

  $userControllerObject = new UserController();
  $response = $userControllerObject->updateUser(
      $_POST['email'],
      $_POST['fname'],
      $_POST['mname'],
      $_POST['lname'],
      $_POST['phone']
);

//response to client
echo $response;
}

?>
