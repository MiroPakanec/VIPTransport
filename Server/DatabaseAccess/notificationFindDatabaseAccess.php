<?php

require_once('databaseMongodbConnection.php');

class NotificationFindDatabaseAccess{

  public function getNotifications($ammount, $skip, $type, $receiver){

    try{

      //testing
      $receiver = "miroslav@gmail.com";

      $collection = DatabaseMongodbConnection::getCollection("VIPTransport", "notifications");
      if($ammount == 'n')
        $cursor = $collection->find(array("reciever"=> $receiver, "read"=> false));
      else if($type === 'all')
        $cursor = $collection->find(array("reciever"=> $receiver), array('limit' => $ammount, 'skip' => $skip, 'sort' => array('date' => -1)));
      else if($type === 'unread')
        $cursor = $collection->find(array("reciever"=> $receiver, "read"=>false), array('limit' => $ammount, 'skip' => $skip, 'sort' => array('date' => -1)));

      return $cursor;
    }
    catch(Exception $e){

      return 0;
    }
  }
}


?>
