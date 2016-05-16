<?php

require_once('databaseMongodbConnection.php');

class StatisticsFindDatabaseAccess{

  public function getStatistics($mapReduce){

    try{

      $db = DatabaseMongodbConnection::getDb("VIPTransport");
      $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");

      //return var_dump($mapReduce['query']);

      $statistics = $db->command(array(
      "mapreduce" => $mapReduce['mapreduce'],
      "map" => new MongoDB\BSON\Javascript($mapReduce['map']),
      "reduce" => new MongoDB\BSON\Javascript($mapReduce['reduce']),
      "query" => $mapReduce['query'],
      "out" => 'map_reduce_collection'));

      $collection = DatabaseMongodbConnection::getCollection($db, "map_reduce_collection");
      $cursor = $collection->find();

      $result = $this->manageMapReduceCursor($cursor);
      return $result;
    }
    catch(Exception $e){

      return $e;
    }
  }

  private function manageMapReduceCursor($cursor){
    $array = array();
    foreach ($cursor as $document) {

      $documentArray = array();
      foreach ($document as $key => $value) {

        if($key == '_id')
          $fieldArray[$key] = $this->manageObjectId($value);
        else
          $fieldArray[$key] = $value;

        $documentArray[$key] = $fieldArray[$key];
      }
      array_push($array, $documentArray);
    }

    return $array;
  }

  private function manageObjectId($value){

    if(!is_object($value))
      return (string)$value;

    $array = array();
    foreach ($value as $key => $value) {

      $array[$key] = $value;
    }

    return $array;
  }
}
?>
