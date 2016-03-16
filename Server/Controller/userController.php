<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';


  class UserController{

    public function registerUser($username, $fname, $mname, $lname, $password, $email, $phone){

      $password = password_hash($password , PASSWORD_BCRYPT);
      $userModelObject = new UserModel($username, $fname, $mname, $lname, $password, $email, $phone);
      $userDataAccessObject = new UserDatabaseAccess();
      return $userDataAccessObject->registerUser($userModelObject);
    }
  }

?>
