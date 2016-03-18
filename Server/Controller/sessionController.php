<?php

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

    public function startSession(){

      session_start();
    }

    public function endSession(){

      session_destroy();
    }
  }

?>
