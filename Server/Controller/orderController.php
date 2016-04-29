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

      public function crearteOrder($email, $date, $timeHour, $timeMinute, $clock, $from, $to, $pasangers, $payment, $phone, $names){

        $this->startSession();
        $validationControllerObject = new ValidationController();
        if($this->validateDate($date, $timeHour, $timeMinute, 00, $clock) > 0)
          return 0;


        $datetimeString = $date." ".$timeHour.":".$timeMinute.":00 ".$clock;
        $datetime = Datetime::createFromFormat('d/m/Y H:i:s A', $datetimeString);
        $orderModelObject = new OrderModel('', $email, $datetime, $from, $to, $pasangers, $payment, $phone, $names, '', '');

        if($validationControllerObject->validateOrder($orderModelObject) > 0)
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

      public function updateOrder($id, $email, $date, $timeHour, $timeMinute, $clock, $from, $to, $pasangers, $payment, $phone, $names){

        $this->startSession();
        $validationControllerObject = new ValidationController();

        if($this->validateDate($date, $timeHour, $timeMinute, 00, $clock) > 0)
          return 0;

        $status = $this->getStatusBySession();
        $datetimeString = $date." ".$timeHour.":".$timeMinute.":00 ".$clock;
        $datetime = Datetime::createFromFormat('d/m/Y H:i:s A', $datetimeString);
        $orderModelObject = new OrderModel($id, $email, $datetime, $from, $to, $pasangers, $payment, $phone, $names, '', $status);

        if($validationControllerObject->validateOrder($orderModelObject) > 0)
          return 0;
        if($this->checkOrderState($orderModelObject->getId()) > 0)
          return 0;

        $orderUpdateDatabaseAccessObject = new OrderUpdateDatabaseAccess();
        $updateResponse = $orderUpdateDatabaseAccessObject->updateOrder($orderModelObject);

        $wasNotified = $this->sendOrderNotifications($id, 'update', ' ');
        /*if($wasNotified == 0)
          return 0;*/

        return $updateResponse;
      }

      public function getOrders($id, $email, $dateFrom, $dateTo){

        $this->startSession();
        $validationControllerObject = new ValidationController();
        $orderSelectDatabaseAccessObject = new OrderSelectDatabaseAccess();

        $wClause = $this->getOrdersWClause($id, $email, $dateFrom, $dateTo);
        if($validationControllerObject->validateOrderSearch($id, $email, $dateFrom, $dateTo) > 0)
          $wClause = " WHERE 1";

        return $orderSelectDatabaseAccessObject->getOrderData($wClause);
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
        $validationControllerObject = new ValidationController();

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

        if($validationControllerObject->validateOrderState($orderModelObject->getStatus(), $_SESSION['type']) > 0)
          return 2;

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

    private function getStatusBySession(){

      $this->startSession();
      if($_SESSION['type'] == 'manager')
        return 'Confirmed';
      else if($_SESSION['type'] == 'customer')
        return 'Stand by';
    }

    private function checkOrderState($id){

      $validationControllerObject = new ValidationController();

      $this->startSession();
      $orderModelObject = $this->getOrders($id, '', '', '')[0];
      return $validationControllerObject->validateOrderState($orderModelObject->getStatus(), $_SESSION['type']);
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
      $userArray = $this->getUsers($wClause, $orderModelObject->getEmail());

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

      if($_SESSION['type'] == 'manager')
        return 'deleted';

      if($status == 'Stand by')
        return 'deleted';
      else if($status == 'Confirmed')
        return 'sent delete request on';
      else
        return '';
    }

    private function getUpdateAction($status){

      if($_SESSION['type'] == 'manager')
        return 'updated';

      if($status == 'Stand by')
        return 'updated';
      else if($status == 'Confirmed')
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

    private function getUsers($wClause, $orderParticipant){

      $userControllerObject = new UserController();
      $userArray = $userControllerObject->getUserData($wClause);
      $userEmailArray = array();

      foreach ($userArray as $userModelObject) {

        array_push($userEmailArray, $userModelObject->getEmail());
      }

      //push other participants then manager
      if($_SESSION['type'] != 'manager')
        array_push($userEmailArray, $_SESSION['email']);
      else
        array_push($userEmailArray, $orderParticipant);

      return $userEmailArray;
    }

    private function validateDate($date, $hour, $minute, $second, $clock){

      $year = substr($date, 6, 4);
      $month = substr($date, 3, 2);
      $day = substr($date, 0, 2);

      $validationControllerObject = new ValidationController();
      return $validationControllerObject->validateDate($year, $month, $day, $hour, $minute, $second, $clock);
    }

    private function getOrdersWClause($id, $email, $dateFrom, $dateTo){


      $wClause = '';
      if($_SESSION['type'] == 'customer'){
         $wClause = " WHERE Email = '".$_SESSION['email']."'";
         if(strlen($id) != 0)
          $wClause .= " AND Id = ".$id;
      }
      else if($_SESSION['type'] == 'manager')
        $wClause = $this->getOrdersWClauseManager($id, $email, $dateFrom, $dateTo);

      return $wClause;
    }

    private function getOrdersWClauseManager($id, $email, $dateFrom, $dateTo){

      $wClause = 'WHERE 1';

      if(strlen($id) > 0)
        $wClause .= ' AND Id LIKE '."'%".$id."%'";

      if(strlen($email) > 0)
        $wClause .= " AND Email LIKE '%".$email."%'";

      if(strlen($dateFrom) > 0)
        $wClause .=" AND DateTime > '".$dateFrom."'";

      if(strlen($dateTo) > 0)
        $wClause .=" AND DateTime < '".$dateTo."'";

      return $wClause;
    }

    private function getOrdersNamesWClause($id){

      if(strlen($id) != 0)
          return "WHERE Order_id = ".$id;

      return '';
    }
  }

?>
