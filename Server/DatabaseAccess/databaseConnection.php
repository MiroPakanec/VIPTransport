<?php

  Class DatabaseConnection{

    public static function openConnection(){

      if(!DEFINED('DB_USER')) DEFINE ('DB_USER', 'root');
      if(!DEFINED('DB_PASSWORD'))DEFINE ('DB_PASSWORD', '');
      if(!DEFINED('DB_HOST'))DEFINE ('DB_HOST', 'localhost');
      if(!DEFINED('DB_NAME'))DEFINE ('DB_NAME', 'VIPTransport');

      $dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
      OR die('We are sorry, something went wrong... shiiit');

      return $dbc;
    }
  }

?>
