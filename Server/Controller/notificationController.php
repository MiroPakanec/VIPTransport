<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/validationController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/notificationFindDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/notificationUpdateDatabaseAccess.php';

  session_start();

  class NotificationController{

    public function getNotifications($ammount){

        $receiver = $_SESSION['email'];
        if (strlen($receiver) <= 0)
          return 0;

        $notificationFindDatabaseAccessObject = new NotificationFindDatabaseAccess();
        $cursor = $notificationFindDatabaseAccessObject->getNotifications($ammount, $receiver);

        return $this->manageNotificationCursor($cursor);
    }

    public function getNotificationsAmmount($ammount){

        $receiver = $_SESSION['email'];
        if (strlen($receiver) <= 0)
          return 0;

        $notificationFindDatabaseAccessObject = new NotificationFindDatabaseAccess();
        $cursor = $notificationFindDatabaseAccessObject->getNotifications($ammount, $receiver);

        //return $this->manageNotificationCursor($cursor);
        return $this->countNotifications($cursor);
    }

    public function readNotifications(){

      $email = $_SESSION['email'];
      if (strlen($email) <= 0)
        return 0;

      $notificationUpdateDatabaseAccessObject = new NotificationUpdateDatabaseAccess();
      $result = $notificationUpdateDatabaseAccessObject->readNotifications($email);
      return $result->getModifiedCount();
    }

    private function countNotifications($cursor){

      $counter = 0;

      foreach ($cursor as $document) {
        $counter++;
      }

      return $counter;
    }

    private function manageNotificationCursor($cursor){

      $array = array();

      foreach ($cursor as $document) {
        $documentArray = array();
        foreach ($document as $key => $value) {

          if(is_object($value))
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
    }

    private function manageNotificationObject($object){

      $objectArray = array();

      foreach ($object as $key => $value) {
        $objectArray[$key] = $value;
      }

      return $objectArray;
    }
  }
