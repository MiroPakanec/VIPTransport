<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/carSelectDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/carModel.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/validationController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/notificationController.php';

class CarController{

  public function getCars($spz){

    $carModelObject = new CarModel($spz, '', '', '', '', '', '', '', '', '', '', '', '');
    $carSelectDatabaseAccessObject = new CarSelectDatabaseAccess();

    if($this->validateCar($carModelObject) == 0)
      return 0;

    $wClause = $this->getCarWClause($carModelObject);
    return $carSelectDatabaseAccessObject->getCars($wClause);
  }

  private function startSession(){

    $sessionControllerObject = new SessionController();
    if(!$sessionControllerObject->sessionStarted())
      $sessionControllerObject->startSession();
  }

  private function validateCar($carModelObject){

    $validationControllerObject = new ValidationController();

    $this->startSession();
    if($_SESSION['type'] != 'manager')
      return 0;

    if ($validationControllerObject->validateCar($carModelObject) > 0)
      return 0;

    return 1;
  }

  private function getCarWClause($carModelObject){

    $wClause = ' WHERE 1';

    if(strlen($carModelObject->getSpz()) > 0)
      $wClause += " AND WHERE Spz = ".$carModelObject->getSpz();

    return $wClause;
  }
}
