<?php

  Class DatabaseConnection{

    public static function openConnection(){

      DEFINE ('DB_USER', 'root');
      DEFINE ('DB_PASSWORD', '');
      DEFINE ('DB_HOST', 'localhost');
      DEFINE ('DB_NAME', 'VIPTransport');

      $dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
      OR die('We are sorry, something went wrong... shiiit');

      return $dbc;
    }
  }

?>