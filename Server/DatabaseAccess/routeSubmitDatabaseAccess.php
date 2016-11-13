<?php

require_once('databaseConnection.php');

class RouteSubmitDatabaseAccess{

  public function Submit($orderId, $routeId, $email, $date, $from, $to, $price, $duration, $distance, $car){

    try{
      $dbc = DatabaseConnection::openConnection();
      $dbc->autocommit(false);
      $errorString = '';

      /*CHANGE ORDER STATUS*/
      $orderQuery = "UPDATE transport_order SET Status = 'Completed' WHERE Id = ".$orderId;
      /*DELETE ROUTE*/
      $routeQuery = "DELETE FROM transport_route WHERE Order_id = ".$orderId;
      /*DELETE ROUTE COUNTRIES*/
      $countryQuery = "DELETE FROM transport_route_country_code WHERE Route_id = ".$routeId;
      /*UPDATE CAR MEALIGE */
      $carQuery = "UPDATE `car` SET `Mealige`= `Mealige` + ".$distance."  WHERE `Spz` = '".$car."'";
      /*INSERT TRANSPORT*/
      $transportQuery = "INSERT INTO `transport_custom`(`OrderId`, `Email`, `Date`, `From`, `To`, `Price`, `Duration`, `Distance`) VALUES (".$orderId.", '".$email."','".$date."','".$from."','".$to."',".$price.",'".$duration."',".$distance.")";

      $dbc->query($countryQuery);
      $errorString .= $dbc->error;
      $dbc->query($routeQuery);
      $errorString .= $dbc->error;
      $dbc->query($orderQuery);
      $errorString .= $dbc->error;
      $dbc->query($carQuery);
      $errorString .= $dbc->error;
      $dbc->query($transportQuery);
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

      return -1;
    }
  }
}


?>
