<?php
  //error_reporting(0);

  require_once('databaseConnection.php');

  class OrderRouteConfirmDatabaseAccess{

    public function confirmOrder($routeModelObject){

      try{

        $dbc = DatabaseConnection::openConnection();
        $dbc->autocommit(false);
        $errorString = '';

        $orderWCluase = "WHERE Id = ".$routeModelObject->getOrderId();
        $orderQuery = "UPDATE transport_order SET Status = 'Confirmed' ".$orderWCluase;
        $routeQuery = $this->getRouteInsertQuery($dbc, $routeModelObject);

        $dbc->query($orderQuery);
        $errorString .= $dbc->error;
        $dbc->query($routeQuery);
        $routeId = $dbc->insert_id;
        $errorString .= $dbc->error;

        $countryCodeQueryArray = $this->getCountryCodeInsertQueryArray($dbc, $routeModelObject, $routeId);
        $dbc = $this->processInsert($dbc, $countryCodeQueryArray);
        $errorString .= $dbc->error;

        if(strlen($errorString) == 0){

            $dbc->commit();
            return 1;
        }
        else{

            $dbc->rollback();
            return 0;
        }
      }
      catch(Exception $e){

        return 0;
      }
    }

    private function processInsert($dbc, $insertQueryArray){

      if(empty($insertQueryArray))
        return $dbc;

      foreach ($insertQueryArray as $insertQuery) {

        $dbc->query($insertQuery);
      }

      return $dbc;
    }

    private function getRouteInsertQuery($dbc, $routeModelObject){

      try{

        $orderId = $dbc->real_escape_string(trim($routeModelObject->getOrderId()));
        $transporterEmail = $dbc->real_escape_string(trim($routeModelObject->getTransporterEmail()));
        $carSpz = $dbc->real_escape_string(trim($routeModelObject->getCarSpz()));

        $queryRoute = "INSERT into transport_route(Order_id, Transporter_email, Car_spz) ".
                    "VALUES('{$orderId}', '{$transporterEmail}', '{$carSpz}')";

        return $queryRoute;
      }
      catch(Exception $e){

        return $e;
      }
    }

    private function getCountryCodeInsertQueryArray($dbc, $routeModelObject, $routeId){

      $insertQueryArray = array();
      if(empty($countryCodes))
        return $insertQueryArray;

        foreach ($routeModelObject->getCountries() as $countryCode) {

           $query = $this->getCountryCodeInsertQuery($dbc, $countryCode, $routeId);
           array_push($insertQueryArray, $query);
        }

        return $insertQueryArray;
    }

    private function getCountryCodeInsertQuery($dbc, $countryCode, $routeId){

      $query = "INSERT INTO transport_route_country_code (Route_id, Country_code)" .
               " VALUES ('{$routeId}', '{$countryCode}')";

      return $query;
    }
  }

?>
