<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/orderUpdateDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/transportInsertDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/transportModel.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/routeModel.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/companyModel.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/validationController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/carController.php';

class TransportController{

    public function insertTransport($orderArray, $routeArray, $transportArray, $employeeArray, $companyArray){

      if($this->startSession() == 0)
        return 0;

      $transportModelObject = $this->getTransportModelFromArray($orderArray, $routeArray, $transportArray, $employeeArray, $companyArray);
      if($this->validateTransport($transportModelObject) > 0)
        return 0;

      //update RDBMS and insert to MongoDB
      return $this->updateRelationalDbTransportInsert($transportModelObject);
    }

    private function updateRelationalDbTransportInsert($transportModelObject){

      //update order status | car mealige | remove route and route countries
      $orderUpdateDatabaseAccessObject = new OrderUpdateDatabaseAccess();
      return $orderUpdateDatabaseAccessObject->updateOrderStatus('Completed', $transportModelObject);
    }

    private function startSession(){

      $sessionControllerObject = new SessionController();
      if(!$sessionControllerObject->sessionStarted())
        $sessionControllerObject->startSession();

      if($this->checkTransportSession() == 1)
        return 1;

      return 0;
    }

    private function validateTransport($transportModelObject){

      $validationControllerObject = new ValidationController();
      $errorCounter = 0;

      $errorCounter += $validationControllerObject->validateTransport($transportModelObject);
      $errorCounter += $validationControllerObject->validateUser($transportModelObject->getEmployee());
      $errorCounter += $validationControllerObject->validateOrder($transportModelObject->getOrder());
      $errorCounter += $validationControllerObject->validateRoute($transportModelObject->getRoute());
      $errorCounter += $validationControllerObject->validateCompany($transportModelObject->getCompany());

      return $errorCounter;
    }

    private function checkTransportSession(){

      if($_SESSION['type'] == 'manager' || $_SESSION['type'] ==  'transporter')
        return 1;

      return 0;
    }

    private function getTransportModelFromArray($orderArray, $routeArray, $transportArray, $employeeArray, $companyArray){

      $transportModelObject = new TransportModel(null, null, null, null, null, null, null, null, null, null, null);
      $transportModelObject->setPrice($transportArray['price']);
      $transportModelObject->setMealige($transportArray['mealige']);
      $transportModelObject->setDistance($this->calculateTransportDistance($transportArray['mealige'], $routeArray['carSpz']));
      $transportModelObject->setArrivalDatePickUp($this->getDateObject($transportArray['arrivalDate'].$transportArray['arrivalTime']));
      $transportModelObject->setArrivalDateDestination($this->getDateObject($transportArray['arrivalDestinationDate'].$transportArray['arrivalDestinationTime']));
      $transportModelObject->setDuration($transportArray['duration']);
      $transportModelObject->setType($transportArray['type']);
      $transportModelObject->setOrder($this->getOrderModelFromArray($orderArray));
      $transportModelObject->setRoute($this->getRouteModelFromArray($routeArray));
      $transportModelObject->setEmployee($this->getUserModelFromArray($employeeArray));
      $transportModelObject->setCompany($this->getCompanyModelFromArray($companyArray));

      return $transportModelObject;
    }

    private function getDateObject($dateTimeString){

      $datetime = Datetime::createFromFormat('Y-m-d H:i:s', $dateTimeString);
      return $datetime;
    }

    private function getOrderModelFromArray($orderArray){

      $orderModelObject = new OrderModel(null, null, null, null, null, null, null, null, null, null, null);
      $orderModelObject->setEmail($orderArray['customerEmail']);
      $orderModelObject->setDate($orderArray['dateTime']);
      $orderModelObject->setFrom($orderArray['from']);
      $orderModelObject->setTo($orderArray['to']);
      $orderModelObject->setPayment($orderArray['payment']);
      $orderModelObject->setPhone($orderArray['pasangerPhone']);
      $orderModelObject->setPasangers($orderArray['pasangers']);
      $orderModelObject->setNames($orderArray['names']);
      $orderModelObject->setStatus('Finished');

      return $orderModelObject;
    }

    private function getRouteModelFromArray($routeArray){

      $routeModelObject = new RouteModel(null, null, null, null, null);
      $routeModelObject->setId($routeArray['routeId']);
      $routeModelObject->setOrderId($routeArray['orderId']);
      $routeModelObject->setTransporterEmail($routeArray['transporterEmail']);
      $routeModelObject->setCarSpz($routeArray['carSpz']);

      if(isset($routeArray['countries']))
        $routeModelObject->setCountries($routeArray['countries']);

      return $routeModelObject;
    }

    private function getUserModelFromArray($employeeArray){

      $userModelObject = new userModel(null, null, null, null, null, null, null, null);
      $userModelObject->setEmail($employeeArray['employeeEmail']);
      $userModelObject->setType($employeeArray['type']);

      return $userModelObject;
    }

    private function getCompanyModelFromArray($companyArray){

      $companyArray = $this->replaceDashForNull($companyArray);

      $companyModelObject = new CompanyModel(null, null, null, null, null);
      $companyModelObject->setName($companyArray['name']);
      $companyModelObject->setAddress($companyArray['address']);
      $companyModelObject->setIco($companyArray['ico']);
      $companyModelObject->setDic($companyArray['dic']);

      return $companyModelObject;
    }

    private function replaceDashForNull($companyArray){

      foreach ($companyArray as $key => $value) {

        if($value === '-')
          $companyArray[$key] = null;
      }

      return $companyArray;
    }

    private function calculateTransportDistance($transportMealige, $spz){

      $carControllerObject = new CarController();
      $carModelObjectArray = $carControllerObject->getCars($spz);

      if(empty($carModelObjectArray))
        return null;

      $carModelObject = $carModelObjectArray[0];
      $carMealige = $carModelObject->getMealige();
      $distance = $transportMealige - $carMealige;

      return $distance;
    }
  }

?>
