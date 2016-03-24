<?php

  include_once('databaseConnection.php');
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';

  class OrderSelectDatabaseAccess{

    public function getOrderData($wClause){

      try{

        $id = $email = $datetimeString = $from = $to = $pasangers = $payment = $creationDate = '';

        $dbc = DatabaseConnection::openConnection();
        $query = "SELECT * FROM Transport_order " . $wClause;

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
            }
        }

        mysqli_close($dbc);

        $date = Datetime::createFromFormat('d/m/Y H:i:s A', $datetimeString);

        $orderModelObject = new OrderModel($id, $email, $date, $from, $to, $pasangers, $payment, '', $creationDate);
        return $orderModelObject;
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }
  }
