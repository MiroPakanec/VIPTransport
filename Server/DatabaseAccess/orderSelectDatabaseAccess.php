<?php

  include_once('databaseConnection.php');
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';

  class OrderSelectDatabaseAccess{

    public function getOrderData($wClause){

      try{

        $id = $email = $datetimeString = $from = $to = $pasangers = $payment = $creationDate = '';
        $orderModelArray = array();

        $dbc = DatabaseConnection::openConnection();
        $query = "SELECT * FROM Transport_order " . $wClause. " ORDER BY Id DESC";

        $response = @mysqli_query($dbc, $query);

        if($response){
            while($row = mysqli_fetch_array($response)){

              $id = $row['Id'];
              $email = $row['Email'];
              $datetimeString = $row['DateTime'];
              $from = $row['Departure_address'];
              $to = $row['Arrival_address'];
              $pasangers = $row['Pasangers'];
              $payment = $row['Payment_type'];
              $creationDate = $row['Creation_date'];
              $status = $row['Status'];

              $date = new DateTime($datetimeString);

              $orderModelObject = new OrderModel($id, $email, $date, $from, $to, $pasangers, $payment, '', $creationDate, $status);
              array_push($orderModelArray, $orderModelObject);
            }
        }

        mysqli_close($dbc);
        return $orderModelArray;
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }

    public function getOrderNamesData($wClause){

      try{

        $name = '';
        $orderNamesArray = array();

        $dbc = DatabaseConnection::openConnection();
        $query = "SELECT * FROM pasanger_name " . $wClause;

        $response = @mysqli_query($dbc, $query);

        if($response){
            while($row = mysqli_fetch_array($response)){

              $name = $row['Pasanger_name'];
              array_push($orderNamesArray, $name);
            }
        }

        mysqli_close($dbc);
        return $orderNamesArray;
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }
  }
