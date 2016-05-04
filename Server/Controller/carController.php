<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/carSelectDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/carUpdateDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/carDeleteDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/carModel.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/validationController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/notificationController.php';

class CarController{

  public function getCars($spz){

    $carModelObject = new CarModel($spz, '', '', '', '', '', '', '', '', '', '', '', '');
    $carSelectDatabaseAccessObject = new CarSelectDatabaseAccess();

    if($this->validateCar($carModelObject, false) == 0)
      return 0;

    $wClause = $this->getCarWClause($carModelObject);
    return $carSelectDatabaseAccessObject->getCars($wClause);
  }

  public function updateCar($spz, $brand, $type, $seats, $state, $emissionCheck, $stk, $mandatoryInsurance,
  $accidentInsurance, $mealige, $relativeMealige, $stickers, $services){

      $carUpdateDatabaseAccessObject = new CarUpdateDatabaseAccess();
      $carModelObject = new CarModel($spz, $brand, $type, $seats, $state, $emissionCheck, $stk, $mandatoryInsurance,
                                    $accidentInsurance, $mealige, $relativeMealige, $services, $stickers);

      $carModelObject = $this->setDefaultValues($carModelObject);
      if($this->validateCar($carModelObject, true) == 0)
        return 0;

      return $carUpdateDatabaseAccessObject->updateCar($carModelObject);

  }

  public function deleteCar($spz){

    $carModelObject = new CarModel($spz, '', '', '', '', '', '', '', '', '', '', '', '');
    $carDeleteDatabaseAccessObject = new CarDeleteDatabaseAccess();

    if($this->validateCar($carModelObject, false) == 0)
      return 0;

    $wClause = " WHERE Spz='".$carModelObject->getSpz()."'";
    return $carDeleteDatabaseAccessObject->deleteCar($wClause);
  }

  private function startSession(){

    $sessionControllerObject = new SessionController();
    if(!$sessionControllerObject->sessionStarted())
      $sessionControllerObject->startSession();
  }

  private function validateCar($carModelObject, $validateCar){

    $validationControllerObject = new ValidationController();

    //return $validationControllerObject->validateCar($carModelObject, $validateCar);

    $this->startSession();
    if($_SESSION['type'] != 'manager')
      return 0;

    if(!$validateCar)
      return 1;

    if ($validationControllerObject->validateCar($carModelObject) > 0)
      return 0;

    return 1;
  }

  private function setDefaultValues($carModelObject){

    if(empty($carModelObject->getState()))
      $carModelObject->setState('offhand');

    if(empty($carModelObject->getMealige()))
      $carModelObject->setMealige(0.0);

    if(empty($carModelObject->getRelativeMealige()))
      $carModelObject->setRelativeMealige(0.0);

    return $carModelObject;
  }

  private function getCarWClause($carModelObject){

    $wClause = ' WHERE 1';

    if(strlen($carModelObject->getSpz()) > 0)
      $wClause .= " AND Spz = '".$carModelObject->getSpz()."'";

    return $wClause;
  }
}
