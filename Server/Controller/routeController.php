<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/routeSelectDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/carController.php';
//include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/orderController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/routeModel.php';


class RouteController{

  public function getRoutes($id, $email, $orderId){

    $this->startSession();
    if($_SESSION['type'] != 'manager' && $_SESSION['type'] != 'transporter')
      return 0;

    $routeSelectDatabaseAccessObject = new RouteSelectDatabaseAccess();
    $wClause = $this->getWClause($id, $orderId);
    return $routeSelectDatabaseAccessObject->getRoutes($wClause);
  }

  public function checkCountriesStickers($spz, $routeId){

    $this->startSession();
    if($_SESSION['type'] != 'manager' && $_SESSION['type'] != 'transporter')
      return 0;

    $routeSelectDatabaseAccessObject = new RouteSelectDatabaseAccess();
    $carControllerObject = new CarController();
    $countries = $routeSelectDatabaseAccessObject->getCountries($routeId);
    $message =  $carControllerObject->checkHighwayStickers($spz, $countries);

    return $message;
  }

  public function sendRouteNotifications($orderModelObject, $action){

    $route = $this->getRouteByOrder($orderModelObject->getId());
    //return $orderModelObject->getId();

    if(empty($route))
      return 0;

    $routeModelObject = new RouteModel($route[0], $route[1], $route[3], $route[4], $route[5]);

    //$message = $this->getNotificationTransporterMessage($routeDate);

    return $this->notify($routeModelObject, $orderModelObject, $action);
  }

  private function setRouteAction($action){

    if($action === 'update')
      return 'updated confirmed';
    else if($action == 'confirm')
      return 'confirmed';

    return 0;
  }

  private function notify($routeModelObject, $orderModelObject, $action){

    $notificationControllerObject = new NotificationController();
    $receiverArray = $this->getRouteNotificationReceivers($routeModelObject, $orderModelObject, $action);
    $errorCounter = 0;

    foreach ($receiverArray as $receiver) {

      $notificationArray = $this->createNotificationArray($routeModelObject, $orderModelObject, $action, $receiver);
      $errorCounter += $notificationControllerObject->createNotification($notificationArray);
    }

    if($errorCounter == 0)
      return 1;

    return 0;
  }

  private function getRouteNotificationReceivers($routeModelObject, $orderModelObject, $action){

    $userControllerObject = new UserController();
    $receivers = array();
    $wClause = " WHERE type = 'manager'";

    //get managers
    $managerModelArray = $userControllerObject->getUserData($wClause);
    foreach ($managerModelArray as $managerModelObject) {

      $userArray = array($managerModelObject->getEmail(), 'manager');
      array_push($receivers, $userArray);
    }

    //push transporter
    $userArray = array($routeModelObject->getTransporterEmail(), 'transporter');
    array_push($receivers, $userArray);

    //push customer
    $userArray = array($orderModelObject->getEmail(), 'customer');
    if($action == 'confirm')
      array_push($receivers, $userArray);

    return $receivers;
  }

  private function createNotificationArray($routeModelObject, $orderModelObject, $action, $receiver){

    $orderControllerObject = new OrderController();
    $notificationArray = array();

    $name = $orderControllerObject->getNotificationUserMessage($receiver[0]);
    $action = $this->setRouteAction($action);

    $notificationText = $name.$action.' route';
    $notificationText .= $this->getNotificationText($routeModelObject, $orderModelObject, $receiver[1]);
    $type = $this->getNorificationType($receiver[1]);

    $notificationArray['text'] = $notificationText;
    $notificationArray['action'] = 'update transporter';
    $notificationArray['reciever'] = $receiver[0];
    $notificationArray['type'] = $type;
    $notificationArray['message'] = '';
    $notificationArray['read'] = false;
    $notificationArray['date'] = date("Y-m-d H:i:s");

    return $notificationArray;
  }

  private function getNorificationType($type){

    if($type == 'manager' || $type == 'transporter'){

      return 'route employee';
    }

    return 'route customer';
  }

  private function getNotificationText($routeModelObject, $orderModelObject, $receiverType){

    switch ($receiverType) {
      case 'customer':
        return ', have a lovely journey!';
        break;

      case 'transporter':
        $message = ', (route ID '.$routeModelObject->getId().', order ID: '.$routeModelObject->getOrderId().'). '.
                'Please have a look at the DETAILS';
        return $message;
        break;

      case 'manager':
        $message = ', (route ID '.$routeModelObject->getId().', order ID: '.$routeModelObject->getOrderId().'). '.
                  'Please have a look at the DETAILS';
        return $message;
        break;

      default:
        # code...
        break;
    }
  }

  private function getNotificationTransporterMessage($date){

    $message = 'Your route is taking place at '.$date.'.';
    return $message;
  }

  private function getRouteByOrder($id){

    $routeSelectDatabaseAccessObject = new RouteSelectDatabaseAccess();
    $wClause = "WHERE Order_id = ".$id;

    $routeArray = $routeSelectDatabaseAccessObject->getRoutes($wClause);
    $route = array();
    if(!empty($routeArray))
      $route = $routeArray[0];

    return $route;
  }

  private function getWClause($id, $orderId){

    $wClause =  " WHERE 1";

    if($_SESSION['type'] == 'transporter')
      $wClause .= " AND Transporter_email = '".$_SESSION['email']."'";

    if(!empty($orderId)){
      $wClause .= " AND Order_id = '".$orderId."'";
    }

    if(!empty($id))
      $wClause .= " AND Id = ".$id;

    return $wClause;
  }

  private function startSession(){

    $sessionControllerObject = new SessionController();
    if(!$sessionControllerObject->sessionStarted())
      $sessionControllerObject->startSession();
  }
}
