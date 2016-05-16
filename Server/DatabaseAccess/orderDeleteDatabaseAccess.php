<?php
  //error_reporting(0);

  require_once('databaseConnection.php');

  class OrderDeleteDatabaseAccess{

    public function deleteOrder($orderId){

      try{

        $dbc = DatabaseConnection::openConnection();
        $dbc->autocommit(false);
        $errorString = '';

        $routeId = $this->getRouteId($orderId);
        $wClauseOrder = " WHERE Id = ".$orderId;
        $queryOrder = "DELETE FROM transport_order ".$wClauseOrder;
        $wClauseRoute = " WHERE Id = ".$routeId;
        $queryRoute = "DELETE FROM transport_route ".$wClauseRoute;
        $wClauseRouteCountry = " WHERE Route_id = ".$routeId;
        $queryRouteCountry = "DELETE FROM transport_route_country_code ".$wClauseRouteCountry;

        if($routeId < 0){

          $dbc->query($queryOrder);
          $errorString .= $dbc->error;
        }
        else{

          $dbc->query($queryRouteCountry);
          $errorString .= $dbc->error;
          $dbc->query($queryRoute);
          $errorString .= $dbc->error;
          $dbc->query($queryOrder);
          $errorString .= $dbc->error;
        }

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

    private function getRouteId($orderId){

      $dbc = DatabaseConnection::openConnection();
      $query = 'SELECT Id FROM transport_route WHERE Order_id = '.$orderId;

      $response = @mysqli_query($dbc, $query);
      $routeId = -1;

      if($response){
          while($row = mysqli_fetch_array($response)){

            $routeId = $row['Id'];
          }
      }

      mysqli_close($dbc);
      return $routeId;
    }
  }

?>
