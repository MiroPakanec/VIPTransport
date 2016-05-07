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
        $errorString .= $dbc->error;

        //return $errorString.'test';

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

    private function getRouteInsertQuery($dbc, $routeModelObject){

      try{

        $orderId = $dbc->real_escape_string(trim($routeModelObject->getOrderId()));
        $transporterEmail = $dbc->real_escape_string(trim($routeModelObject->getTransporterEmail()));
        $carSpz = $dbc->real_escape_string(trim($routeModelObject->getCarSpz()));
        $message = $dbc->real_escape_string(trim($routeModelObject->getMessage()));

        $queryRoute = "INSERT into transport_route(Order_id, Transporter_email, Car_spz, Message) ".
                    "VALUES('{$orderId}', '{$transporterEmail}', '{$carSpz}', '{$message}')";

        return $queryRoute;
      }
      catch(Exception $e){

        return $e;
      }
    }
  }

?>
