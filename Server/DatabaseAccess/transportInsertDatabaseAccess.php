<?php

require_once('databaseMongodbConnection.php');

class TransportInsertDatabaseAccess{

  public function createTransport($transportModelObject){

    $orderArray = $this->getOrderArray($transportModelObject->getOrder());
    $routeArray = $this->getRouteArray($transportModelObject->getRoute());
    $userArray = $this->getUserArray($transportModelObject->getEmployee());
    $companyArray = $this->getCompanyArray($transportModelObject->getCompany());

    try{

      $host = DatabaseMongodbConnection::openConnection();
      $collection = DatabaseMongodbConnection::getCollection("VIPTransport", "notifications");
      $bulk = new MongoDB\Driver\BulkWrite(['ordered' => true]);

      $bulk->insert([
                      'price' => (double)$transportModelObject->getPrice(),
                      'mealige' => (double)$transportModelObject->getMealige(),
                      'distance' => (double)$transportModelObject->getDistance(),
                      'arrivalDate' => $transportModelObject->getArrivalDate(),
                      'type' => $transportModelObject->getType(),
                      'employee' => $userArray,
                      'route' => $routeArray,
                      'order' => $orderArray,
                      'company' => $companyArray
                    ]);

      $manager = new MongoDB\Driver\Manager($host);
      $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 100);
      $result = $manager->executeBulkWrite($collection, $bulk, $writeConcern);

      return $result->getInsertedCount();
    }
    catch(Exception $e){

      return 0;
    }
  }

  private function getRouteArray($routeModelObject){

    $array = array();
    $array['id'] = (int)$routeModelObject->getId();
    $array['orderId'] = (int)$routeModelObject->getOrderId();
    $array['transporter'] = $routeModelObject->getTransporterEmail();
    $array['car'] = $routeModelObject->getCarSpz();
    $array['countries'] = $routeModelObject->getCountries();

    return $array;
  }

  private function getOrderArray($orderModelObject){

    $array = array();
    $array['email'] = $orderModelObject->getEmail();
    $array['date '] = $orderModelObject->getDate();
    $array['from'] = $orderModelObject->getFrom();
    $array['to'] = $orderModelObject->getTo();
    $array['payment'] = $orderModelObject->getPayment();
    $array['phone'] = $orderModelObject->getPhone();
    $array['pasangers'] = $orderModelObject->getPasangers();
    $array['names'] = $orderModelObject->getNames();

    return $array;
  }

  private function getUserArray($userModelObject){

    $array = array();
    $array['email'] = $userModelObject->getEmail();
    $array['type'] = $userModelObject->getType();

    return $array;
  }

  private function getCompanyArray($companyModelObject){

    $array = array();
    $array['name'] = $companyModelObject->getName();
    $array['address'] = $companyModelObject->getAddress();
    $array['ico'] = $companyModelObject->getIco();
    $array['dic'] = $companyModelObject->getDic();

    return $array;
  }
}

?>
