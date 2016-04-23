<?php

require_once('databaseMongodbConnection.php');

class NotificationFindDatabaseAccess{

  public function getNotifications($ammount, $skip, $type, $receiver){

    try{

      //testing
      $receiver = "miroslav@gmail.com";

      $collection = DatabaseMongodbConnection::getCollection("VIPTransport", "notifications");

      //$cursor = $collection->find(array("reciever"=> $receiver, "read"=> false));
      if($type === 'all')
        $cursor = $collection->find(array("reciever"=> $receiver), array('limit' => $ammount, 'skip' => $skip, 'sort' => array('date' => -1)));
      else if($type === 'unread')
        $cursor = $collection->find(array("reciever"=> $receiver, "read"=>false), array('limit' => $ammount, 'skip' => $skip, 'sort' => array('date' => -1)));

      return $cursor;
    }
    catch(Exception $e){

      return 0;
    }
  }

  public function getAllNotification($receiver){

    try{

      //testing
      $receiver = "miroslav@gmail.com";

      $collection = DatabaseMongodbConnection::getCollection("VIPTransport", "notifications");
      $cursor = $collection->aggregate([[ '$match' => ['reciever' => $receiver, 'read' => false]], [ '$group' => [ '_id' => '$read', 'total' => [ '$sum' => 1]]]]);

      return $cursor;
    }
    catch(Exception $e){

      return 'error';
    }
  }
}


?>
