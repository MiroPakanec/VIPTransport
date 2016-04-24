<?php

require_once('databaseMongodbConnection.php');

class NotificationInsertDatabaseAccess{

  public function createNotification($notificationArray){

    try{

      //testing
      //$receiver = "miroslav@gmail.com";

      $host = DatabaseMongodbConnection::openConnection();
      $collection = DatabaseMongodbConnection::getCollection("VIPTransport", "notifications");
      $bulk = new MongoDB\Driver\BulkWrite(['ordered' => true]);

      $bulk->insert(['text'=> $notificationArray['text'], 'reciever' => $notificationArray['reciever'], 'action' => $notificationArray['action'], 'type' => $notificationArray['type'], 'message' => $notificationArray['message'], 'read' => $notificationArray['read'], 'date' => $notificationArray['date']]);

      $manager = new MongoDB\Driver\Manager($host);
      $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 100);
      $result = $manager->executeBulkWrite($collection, $bulk, $writeConcern);

      return $result->getInsertedCount();
    }
    catch(Exception $e){

      return 0;
    }
  }
}

?>
