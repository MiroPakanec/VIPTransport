<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/validationController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/notificationInsertDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/notificationFindDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/notificationUpdateDatabaseAccess.php';

  class NotificationController{

    public function createNotification($notificationArray){

      $this->startSession();

      $notificationInsertDatabaseAccessObject = new notificationInsertDatabaseAccess();
      $inserted = $notificationInsertDatabaseAccessObject->createNotification($notificationArray);

      if($inserted == 1)
        //return 0 errors
        return 0;

      //return 1 error
      return 1;
    }

    public function getNotifications($ammount, $skip, $type){

        $this->startSession();

        $receiver = $_SESSION['email'];
        if (strlen($receiver) <= 0)
          return 0;

        $notificationFindDatabaseAccessObject = new NotificationFindDatabaseAccess();
        $cursor = $notificationFindDatabaseAccessObject->getNotifications($ammount, $skip, $type, $receiver);

        //return var_dump($cursor);
        //return var_dump($cursor);
        return $this->manageNotificationCursor($cursor);
    }

    public function getNotificationsAmmount($ammount){

        $this->startSession();

        $receiver = $_SESSION['email'];
        if (strlen($receiver) <= 0)
          return 0;

        $notificationFindDatabaseAccessObject = new NotificationFindDatabaseAccess();
        $cursor = $notificationFindDatabaseAccessObject->getAllNotification($receiver);

        $document = $this->manageNotificationCursor($cursor);
        return $this->manageNotificationsAggregate($document, 'false');

    }

    public function readNotifications($id, $value){

      $this->startSession();

      $email = $_SESSION['email'];
      if (strlen($email) <= 0)
        return 0;

      if($value != 0 && $value != 1)
        return 0;

      $notificationUpdateDatabaseAccessObject = new NotificationUpdateDatabaseAccess();
      $result = $notificationUpdateDatabaseAccessObject->readNotifications($email, $id, $value);
      return 'Modified records: '.$result->getModifiedCount();
      //return $result;
    }

    public function readAllNotifications(){

      $this->startSession();

      $email = $_SESSION['email'];
      if (strlen($email) <= 0)
        return 0;

      $notificationUpdateDatabaseAccessObject = new NotificationUpdateDatabaseAccess();
      $result = $notificationUpdateDatabaseAccessObject->readAllNotifications($email);
      return 'Modified records: '.$result->getModifiedCount();
    }

    private function startSession(){

      $sessionControllerObject = new SessionController();
      if(!$sessionControllerObject->sessionStarted())
        $sessionControllerObject->startSession();
    }

    private function manageNotificationsAggregate($document){

      if(empty($document))
        return 0;

      return $document[0]['total'];
    }

    private function countNotifications($cursor){

      $counter = 0;

      foreach ($cursor as $document) {
        $counter++;
      }

      return $counter;
    }

    /*private function manageNotificationCursor($cursor){

      $array = array();

      foreach ($cursor as $document) {

        $documentArray = array();
        foreach ($document as $key => $value) {

          if(is_object($value) && $key == '_id')
            $fieldArray[$key] = $this->manageObjectId($value);
          else if(is_object($value))
            $fieldArray[$key] = $this->manageNotificationObject($value);
          else if($key == "read")
            $fieldArray[$key] = $value;
          else
            $fieldArray[$key] = $value;

          //if($fieldArray[$key] != '')
          $documentArray[$key] = $fieldArray[$key];
        }
        array_push($array, $documentArray);
      }
      return $array;
    }*/

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

    private function manageNotificationObject($object){

      $objectArray = array();

      foreach ($object as $key => $value) {
        $objectArray[$key] = $value;
      }

      return $objectArray;
    }
  }
