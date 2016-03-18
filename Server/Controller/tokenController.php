<?php

  Class TokenController{

    public function generateToken(){

      $_SESSION['token'] = md5(uniqid(mt_rand(), true));

    }

    public function getToken(){

      return $_SESSION['token'];
    }

    public function destroyToken(){

      $_SESSION['token'] = '';
    }
  }

?>
