<?php

require_once('databaseMongodbConnection.php');

class NotificationFindDatabaseAccess{

  public function getNotifications($ammount, $skip, $type, $receiver){

    try{

      //testing
      //$receiver = "miroslav@gmail.com";

      $collection = DatabaseMongodbConnection::getCollection("VIPTransport", "notifications");
      //$cursor = $collection->find(array("reciever"=> $receiver, "read"=> false));
      if($type === 'all')
        $cursor = $collection->find(array("reciever"=> $receiver), array('limit' => $ammount, 'skip' => $skip, 'sort' => array('date' => -1)));
      else if($type === 'unread')
        $cursor = $collection->find(array("reciever"=> $receiver, "read"=>false), array('limit' => $ammount, 'skip' => $skip, 'sort' => array('date' => -1)));

      //return var_dump(iterator_to_array($cursor));
      return $this->manageNotificationCursor($cursor);
    }
    catch(Exception $e){

      return 0;
    }
  }

  public function getAllNotification($receiver){

    try{

      //testing
      //$receiver = "miroslav@gmail.com";

      $collection = DatabaseMongodbConnection::getCollection("VIPTransport", "notifications");
      $cursor = $collection->aggregate([[ '$match' => ['reciever' => $receiver, 'read' => false]], [ '$group' => [ '_id' => '$read', 'total' => [ '$sum' => 1]]]]);

      //return $cursor;
      $document = $this->manageNotificationCursor($cursor);
      return $this->manageNotificationsAggregate($document, 'false');
    }
    catch(Exception $e){

      return 'error';
    }
  }

  private function manageNotificationCursor($cursor){
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

    return (string)$value;
  }

  private function manageNotificationsAggregate($document){

    if(empty($document))
      return 0;

    return $document[0]['total'];
  }
}


?>
