<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userSelectDatabaseAccess.php';

  class SessionController{

    public function getSessionData(){

      $sessionArray = array();
      $sessionArray = array_fill($_SESSION['username'], $_SESSION['fname'], $_SESSION['mname'],
                      $_SESSION['lname'], $_SESSION['email'], $_SESSION['phone']);
      return $sessionArray;
    }

    public function getSessionUser(){

      return $_SESSION['username'];
    }

    public function getSessionToken(){

      return $_SESSION['token'];
    }

    public function setSessionData($email){

      $userDataAccessObject = new UserSelectDatabaseAccess();
      $wClause = " WHERE Email = '" . $email . "'";
      $userModelObject = $userDataAccessObject->getUserData($wClause);

      $_SESSION['email'] = $userModelObject->getEmail();
      $_SESSION['fname'] = $userModelObject->getFname();
      $_SESSION['mname'] = $userModelObject->getMname();
      $_SESSION['lname'] = $userModelObject->getLname();
      $_SESSION['phone'] = $userModelObject->getPhone();
    }

    public function startSession(){

      session_start();
      return 'session started';
    }

    public function endSession(){

      session_destroy();
    }
  }

?>
