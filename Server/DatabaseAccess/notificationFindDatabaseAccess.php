<?php

require_once('databaseMongodbConnection.php');

class NotificationFindDatabaseAccess{

  public function getNotifications($ammount, $receiver){

    try{

      //testing
      $receiver = "miroslav@gmail.com";

      $collection = DatabaseMongodbConnection::getCollection("VIPTransport", "notifications");
      if($ammount != 'n')
        $cursor = $collection->find(array("reciever"=> $receiver), array('limit' => $ammount, 'sort' => array('read' => 1, 'date' => -1)));
      else
        $cursor = $collection->find(array("reciever"=> $receiver, "read"=> false));

      return $cursor;
    }
    catch(Exception $e){

      return 0;
    }
  }
}


?>
