<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';

if(isset($_POST['currentPassword'], $_POST['newPassword'], $_POST['newPasswordRepeat'])){

  $userControllerObject = new UserController();
  $response = $userControllerObject->updatePassword(
      $_POST['currentPassword'],
      $_POST['newPassword'],
      $_POST['newPasswordRepeat']
    );

//response to client
echo $response;
}

?>
