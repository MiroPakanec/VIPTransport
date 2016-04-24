<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderInsertDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderSelectDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderDeleteDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderUpdateDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/notificationController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';
  //include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/validationController.php';


  class OrderController{

      public function crearteOrder($date, $timeHour, $timeMinute, $clock, $from, $to, $pasangers, $payment, $phone, $names){

        $this->startSession();
        $validationControllerObject = new ValidationController();
        if($this->validateDate($date, $timeHour, $timeMinute, 00, $clock) > 0)
          return 0;

        $datetimeString = $date." ".$timeHour.":".$timeMinute.":00 ".$clock;
        $datetime = Datetime::createFromFormat('d/m/Y H:i:s A', $datetimeString);
        $orderModelObject = new OrderModel('', $_SESSION['email'], $datetime, $from, $to, $pasangers, $payment, $phone, $names, '', '');

        if($validationControllerObject->validateOrder($orderModelObject) > 0)
          return 0;
        if($validationControllerObject->validateNames($orderModelObject->getNames()) > 0)
          return 0;

        $orderInsertDatabaseAccessObject = new OrderInsertDatabaseAccess();
        $wClause = ' ORDER BY id DESC LIMIT 0, 1';

        //ID is returned from DAL and set to model object
        $orderModelObject->setId($orderInsertDatabaseAccessObject->createOrder($orderModelObject));
        if(!$orderModelObject->getId() > 0)
          return 6;

        $wasNotified = $this->sendOrderNotifications($orderModelObject->getId(), 'create', ' ');
        if($wasNotified == 0)
          return 0;

        //return response from DAL insertion to Pasangers table
        return $orderInsertDatabaseAccessObject->createOrderNames($orderModelObject);
      }

      public function updateOrder($id, $date, $timeHour, $timeMinute, $clock, $from, $to, $pasangers, $payment, $phone, $names){

        $this->startSession();
        $validationControllerObject = new ValidationController();
        if($this->validateDate($date, $timeHour, $timeMinute, 00, $clock) > 0)
          return 0;

        $datetimeString = $date." ".$timeHour.":".$timeMinute.":00 ".$clock;
        $datetime = Datetime::createFromFormat('d/m/Y H:i:s A', $datetimeString);
        $orderModelObject = new OrderModel($id, $_SESSION['email'], $datetime, $from, $to, $pasangers, $payment, $phone, $names, '', '');

        if($validationControllerObject->validateOrder($orderModelObject) > 0)
          return 0;
        if($validationControllerObject->validateNames($orderModelObject->getNames()) > 0)
          return 0;

        $wasNotified = $this->sendOrderNotifications($id, 'update', ' ');
        if($wasNotified == 0)
          return 0;

        $orderUpdateDatabaseAccessObject = new OrderUpdateDatabaseAccess();
        return $orderUpdateDatabaseAccessObject->updateOrder($orderModelObject);
      }

      public function getOrders($id){

        $this->startSession();
        $orderSelectDatabaseAccessObject = new OrderSelectDatabaseAccess();
        return $orderSelectDatabaseAccessObject->getOrderData($this->getOrdersWClause($id));
      }

      public function getOrderNames($id){

        $this->startSession();
        $orderSelectDatabaseAccessObject = new OrderSelectDatabaseAccess();
        return $orderSelectDatabaseAccessObject->getOrderNamesData($this->getOrdersNamesWClause($id));
      }

      public function deleteOrder($id){

        $this->startSession();
        $orderDeleteDatabaseAccess = new OrderDeleteDatabaseAccess();
        $orderSelectDatabaseAccessObject = new OrderSelectDatabaseAccess();

        //get order status
        $wClause = "WHERE id = ".$id;
        $orderModelObject = $orderSelectDatabaseAccessObject->getOrderData($wClause)[0];

        //check if id exists
        if(strlen($orderModelObject->getId()) == 0)
          return 0;

        //notify involved users
        $wasNotified = $this->notify($orderModelObject, 'delete', ' ');
        if($wasNotified == 0)
          //0 - request failed
          return 0;

        if($orderModelObject->getStatus() == "Stand by")
          // 0/1 request faild / request successful
          return $orderDeleteDatabaseAccess->deleteOrder($wClause);

        //return 2 - request have been send to manager
        return 2;
    }

    public function requestUpdate($id, $message){

      $this->startSession();
      $wasNotified = $this->sendOrderNotifications($id, 'update', $message);

      if($wasNotified == 0)
        return 0;

      return 1;
    }

    private function startSession(){

      $sessionControllerObject = new SessionController();
      if(!$sessionControllerObject->sessionStarted())
        $sessionControllerObject->startSession();
    }

    private function sendOrderNotifications($id, $action, $message){

      $orderSelectDatabaseAccessObject = new OrderSelectDatabaseAccess();
      $wClause = "WHERE id = ".$id;
      $orderModelObject = $orderSelectDatabaseAccessObject->getOrderData($wClause)[0];

      if(strlen($orderModelObject->getId()) == 0)
        return 0;

      return $this->notify($orderModelObject, $action, $message);
    }

    private function notify($orderModelObject, $action, $message){

      $notificationControllerObject = new NotificationController();
      $userControllerObject = new UserController();

      //get all managers
      $wClause = " WHERE type = 'manager'";
      $userArray = $this->getUsers($wClause);

      //get action from status
      $action = $this->getAction($orderModelObject->getStatus(), $action);

      $errorCounter = 0;
      foreach ($userArray as $userEmail) {

        //create notification
        $notificationArray = $this->createNotificationArray($userEmail, $orderModelObject, $action, $message);
        $errorCounter += $notificationControllerObject->createNotification($notificationArray);
      }

      if($errorCounter == 0)
        return 1;

      return 0;
    }

    private function getAction($status, $action){

      if($action == 'delete')
        return $this->getDeleteAction($status);
      else if($action == 'update')
       return $this->getUpdateAction($status);
      else if($action == 'create')
       return 'created';
    }

    private function getDeleteAction($status){

      if($status == 'Stand by')
        return 'deleted';
      else if($status == 'Modified')
        return 'sent delete request on';
      else
        return '';
    }

    private function getUpdateAction($status){

      if($status == 'Stand by')
        return 'updated';
      else if($status == 'Modified')
        return 'sent update request on';
      else
        return '';
    }

    private function createNotificationArray($userEmail, $orderModelObject, $action, $message){

      $notificationArray = array();

      $name = $this->getNotificationUserMessage($userEmail);

      $notificationText = $name.$action.' order at '.
      $orderModelObject->getDate()->format('d/m/Y h:i:s A').(' (ID:'.$orderModelObject->getId().')');

      $notificationArray['text'] = $notificationText;
      $notificationArray['action'] = $action;
      $notificationArray['reciever'] = $userEmail;
      $notificationArray['type'] = 'order';
      $notificationArray['message'] = $message;
      $notificationArray['read'] = false;
      $notificationArray['date'] = date("Y-m-d H:i:s");

      return $notificationArray;
    }

    private function getNotificationUserMessage($userEmail){

      if($_SESSION['email'] === $userEmail)
        return 'You have ';

      return $_SESSION['fname'].' '.$_SESSION['mname'].' '.$_SESSION['lname'].'('.$_SESSION['email'].')'.' has ';
    }

    private function getUsers($wClause){

      $userControllerObject = new UserController();
      $userArray = $userControllerObject->getUserData($wClause);
      $userEmailArray = array();

      foreach ($userArray as $userModelObject) {

        array_push($userEmailArray, $userModelObject->getEmail());
      }
      array_push($userEmailArray, $_SESSION['email']);
      return $userEmailArray;
    }

    private function validateDate($date, $hour, $minute, $second, $clock){

      $year = substr($date, 6, 4);
      $month = substr($date, 3, 2);
      $day = substr($date, 0, 2);

      $validationControllerObject = new ValidationController();
      return $validationControllerObject->validateDate($year, $month, $day, $hour, $minute, $second, $clock);
    }

    private function getOrdersWClause($id){

      $wClause = '';
      if($_SESSION['type'] == 'customer'){
         $wClause = " WHERE Email = '".$_SESSION['email']."'";
         if(strlen($id) != 0)
          $wClause .= " AND Id = ".$id;
      }

      return $wClause;
    }

    private function getOrdersNamesWClause($id){

      if(strlen($id) != 0)
          return "WHERE Order_id = ".$id;

      return '';
    }
  }

?>
