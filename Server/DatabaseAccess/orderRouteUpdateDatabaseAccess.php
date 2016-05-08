<?php
  //error_reporting(0);

  require_once('databaseConnection.php');

  class OrderRouteUpdateDatabaseAccess{

    public function updateRoute($routeModelObject){

      try{

        $dbc = DatabaseConnection::openConnection();
        $dbc->autocommit(false);
        $errorString = '';

        $routeWClause = " WHERE Order_id = ".$routeModelObject->getOrderId();
        $routeQuery = $this->getRouteUpdateQuery($dbc, $routeModelObject, $routeWClause);

        $dbc->query($routeQuery);
        $errorString .= $dbc->error;

        $wClauseRouteCountryCodes = " WHERE Route_id = ".$routeModelObject->getId();
        $queryRouteCountry = "DELETE FROM transport_route_country_code ".$wClauseRouteCountryCodes;
        $dbc->query($queryRouteCountry);
        $errorString .= $dbc->error;

        $countryCodeQueryArray = $this->getCountryCodeInsertQueryArray($dbc, $routeModelObject);
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

    private function getRouteUpdateQuery($dbc, $routeModelObject, $wClause){

      try{

        $orderId = $dbc->real_escape_string(trim($routeModelObject->getOrderId()));
        $transporterEmail = $dbc->real_escape_string(trim($routeModelObject->getTransporterEmail()));
        $carSpz = $dbc->real_escape_string(trim($routeModelObject->getCarSpz()));

        $queryRoute = "UPDATE transport_route SET Transporter_email = '{$transporterEmail}', Car_spz = '{$carSpz}' ".$wClause;
        return $queryRoute;
      }
      catch(Exception $e){

        return $e;
      }
    }

    private function getCountryCodeInsertQueryArray($dbc, $routeModelObject){

      $insertQueryArray = array();
      if(empty($routeModelObject->getCountries()))
        return $insertQueryArray;

        foreach ($routeModelObject->getCountries() as $countryCode) {

           $query = $this->getCountryCodeInsertQuery($dbc, $countryCode, $routeModelObject->getId());
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
