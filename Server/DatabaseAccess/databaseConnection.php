<?php

  Class DatabaseConnection{

    public static function openConnection(){

      //LOCALHOST
      
      if(!DEFINED('DB_USER')) DEFINE ('DB_USER', 'root');
      if(!DEFINED('DB_PASSWORD'))DEFINE ('DB_PASSWORD', '');
      if(!DEFINED('DB_HOST'))DEFINE ('DB_HOST', 'localhost');
      if(!DEFINED('DB_NAME'))DEFINE ('DB_NAME', 'VIPTransport');


      //DOMAIN
      /*
      if(!DEFINED('DB_USER')) DEFINE ('DB_USER', 'b18_18777150');
      if(!DEFINED('DB_PASSWORD'))DEFINE ('DB_PASSWORD', 'adidassx2');
      if(!DEFINED('DB_HOST'))DEFINE ('DB_HOST', 'sql108.byethost18.com');
      if(!DEFINED('DB_NAME'))DEFINE ('DB_NAME', 'b18_18777150_viptransportdb');
      */

      $dbc = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

      if($dbc->connect_errno){
        die('We are sorry, we are having some problems...');
      }

      return $dbc;
    }
  }

?>
