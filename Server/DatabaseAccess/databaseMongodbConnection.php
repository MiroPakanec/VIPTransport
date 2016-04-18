<?php

require 'MongoConnectionConfiguration/vendor/autoload.php';

Class DatabaseMongodbConnection{

  public static function getCollection($database, $collection){

    $host = 'mongodb://localhost:27017';

    $mongo = new MongoDB\Client($host);
    $db = $mongo->$database;
    $col = $db->$collection;

    return $col;
  }

  public static function openConnection(){

    $host = 'mongodb://localhost:27017';
    return $host; 
  }
}

?>
