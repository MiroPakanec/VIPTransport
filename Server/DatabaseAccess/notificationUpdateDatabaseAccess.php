<?php

require_once('databaseMongodbConnection.php');

class NotificationUpdateDatabaseAccess{

  public function readNotifications($email){

    try{

      //testing
      $email = "miroslav@gmail.com";

      $host = DatabaseMongodbConnection::openConnection();
      $collection = DatabaseMongodbConnection::getCollection("VIPTransport", "notifications");

      $bulk = new MongoDB\Driver\BulkWrite(['ordered' => true]);
      $bulk->update(['reciever' => $email], ['$set' => ['read' => true]], ['multi' => true]);

      $manager = new MongoDB\Driver\Manager($host);
      $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 100);
      $result = $manager->executeBulkWrite($collection, $bulk, $writeConcern);

      return $result;
    }
    catch(Exception $e){

      return 0;
    }
  }
}


?>
