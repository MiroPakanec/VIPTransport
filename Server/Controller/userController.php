<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userRegistrationDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userLoginDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';


  class UserController{

    public function registerUser($email, $fname, $mname, $lname, $password, $phone){

      $password = password_hash($password , PASSWORD_BCRYPT);
      $userModelObject = new UserModel($email, $fname, $mname, $lname, $password, $phone);
      $userDataAccessObject = new UserRegistrationDatabaseAccess();
      return $userDataAccessObject->registerUser($userModelObject);
    }

    public function loginUser($email, $password, $token){

      $userDataAccessObject = new UserLoginDatabaseAccess();

      //get password from db
      $storedPassword = $userDataAccessObject->getUserLoginPassword($email);
      if(strlen($storedPassword) == 0)
        return 'Incorrect email';


      if(!password_verify($password, $storedPassword))
        return 'Incorrect password';
      else
        return 'in';


    }
  }

?>