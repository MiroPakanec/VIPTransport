<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';

if(isset($_POST['email'], $_POST['type'])){

  $userControllerObject = new UserController();
  $response = $userControllerObject->updateType(
      $_POST['email'],
      $_POST['type']
  );

//response to client
echo $response;
}

?>
