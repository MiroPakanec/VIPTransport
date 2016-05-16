<?php
  //error_reporting(0);

  require_once('databaseConnection.php');
  require_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';

  class OrderUpdateDatabaseAccess{

    public function updateOrder($orderModelObject){

      try{

        $dbc = DatabaseConnection::openConnection();
        $queryArray = array();

        $id = $dbc->real_escape_string(trim($orderModelObject->getId()));
        //$email = $dbc->real_escape_string(trim($orderModelObject->getEmail()));
        $date = $dbc->real_escape_string(trim($orderModelObject->getDate()->format('Y-m-d h:i:s A')));
        $from = $dbc->real_escape_string(trim($orderModelObject->getFrom()));
        $to = $dbc->real_escape_string(trim($orderModelObject->getTo()));
        $pasangers = $dbc->real_escape_string(trim($orderModelObject->getPasangers()));
        $payment = $dbc->real_escape_string(trim($orderModelObject->getPayment()));
        $phone = $dbc->real_escape_string(trim($orderModelObject->getPhone()));
        //$status = $dbc->real_escape_string(trim($orderModelObject->getStatus()));
        $names = $orderModelObject->getNames();

        $query = "UPDATE Transport_order  SET ".
                 "DateTime = '{$date}', Departure_address = '{$from}', Arrival_address = '{$to}',".
                 "Pasangers = '{$pasangers}', Payment_type = '{$payment}', Phone = '{$phone}' WHERE Id=".$id;

        $query1 = "DELETE FROM  Pasanger_name WHERE Order_id=".$id;

        $queryArray = $this->getInsertQueries($names, $id, $dbc);
        array_unshift($queryArray, $query1);

        $dbc->autocommit(false);
        $error = '';
        //execute order UPDATE
        $dbc->query($query);
        if($dbc->affected_rows == 0)
          $error .= 'n';

        //execute queries from array
        foreach ($queryArray as $element) {
          $dbc->query($element);
          if($dbc->affected_rows == 0)
            $error .= 'e';
        }

        //notice - no changes
        if(strpos($error, 'e')){
          $dbc->rollback();
          return 4;
        }
        else if(strpos($error, 'n')){
          $dbc->commit();
          return 2;
        }
        else{
          $dbc->commit();
          return 3;
        }
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }

    private function getInsertQueries($names, $id, $dbc){

        $queryArray = array();

        foreach ($names as $value) {

          $name = $dbc->real_escape_string(trim($value));
          $query = "INSERT INTO Pasanger_name (Order_id, Pasanger_name)" .
                   " VALUES ('{$id}', '{$name}')";

          array_push($queryArray, $query);
        }

        return $queryArray;
    }

    public function updateOrderStatus($status, $transportModelObject){

      $transportInsertDatabaseAccessObject = new TransportInsertDatabaseAccess();

      try{

        $errorString = '';
        $dbc = DatabaseConnection::openConnection();
        $dbc->autocommit(false);

        $orderId = $transportModelObject->getRoute()->getOrderId();
        $routeId = $transportModelObject->getRoute()->getId();
        $carSpz = $transportModelObject->getRoute()->getCarSpz();
        $transportMealige = $transportModelObject->getMealige();

        $orderWClause = " WHERE id=".$orderId;
        $orderQuery = "UPDATE transport_order SET Status='".$status."' ".$orderWClause;
        $dbc->query($orderQuery);
        $errorString .= $dbc->error;

        if($status == 'Completed'){

          $dbc = $this->deleteRouteCountries($dbc, $routeId);
          $errorString .= $dbc->error;

          $dbc = $this->deleteRoute($dbc, $routeId);
          $errorString .= $dbc->error;

          $dbc = $this->updateCarMealige($dbc, $carSpz, $transportMealige);
          $errorString .= $dbc->error;
        }

        if(strlen($errorString) == 0){

            //insert transport to mongo db
            $mongodbInserted = $transportInsertDatabaseAccessObject->createTransport($transportModelObject);
            if($mongodbInserted < 1){

              $dbc->rollback();
              return 0;
            }

            $dbc->commit();
            return 1;
        }
        else{

            $dbc->rollback();
            return 0;
        }
      }
      catch(Exception $e){

        $dbc->rollback();
        return 0;
      }
    }

    private function deleteRouteCountries($dbc, $routeId){

      $routeWClause = " WHERE Route_id=".$routeId;
      $deleteRouteQuery = "Delete from transport_route_country_code".$routeWClause;
      $dbc->query($deleteRouteQuery);

      return $dbc;
    }

    private function deleteRoute($dbc, $routeId){

      $routeWClause = " WHERE Id=".$routeId;
      $deleteRouteQuery = "Delete from transport_route".$routeWClause;
      $dbc->query($deleteRouteQuery);

      return $dbc;
    }

    private function updateCarMealige($dbc, $carSpz, $transportMealige){

      $carWClause = " WHERE Spz = '".$carSpz."'";
      $carUpdateQuery = "UPDATE car SET Mealige=".$transportMealige;
      $dbc->query($carUpdateQuery);

      return $dbc;
    }
  }

?>
