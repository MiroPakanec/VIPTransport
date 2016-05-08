<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/routeSelectDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/carController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/routeModel.php';


class RouteController{

  public function getRoutes($email, $orderId){

    $this->startSession();
    if($_SESSION['type'] != 'manager' && $_SESSION['type'] != 'transporter')
      return 0;

    $routeSelectDatabaseAccessObject = new RouteSelectDatabaseAccess();
    $wClause = $this->getWClause($orderId);
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

  private function getWClause($orderId){

    $wClause =  " WHERE 1";

    if($_SESSION['type'] == 'transporter')
      $wClause .= " AND Transporter_email = '".$_SESSION['email']."'";

    if(!empty($orderId)){
      $wClause .= " AND Order_id = '".$orderId."'";
    }

    return $wClause;
  }

  private function startSession(){

    $sessionControllerObject = new SessionController();
    if(!$sessionControllerObject->sessionStarted())
      $sessionControllerObject->startSession();
  }
}
