<?php

  require_once('databaseConnection.php');
  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';

  class OrderInsertDatabaseAccess{

    public function crearteOrder($orderModelObject){

      try{

        $dbc = DatabaseConnection::openConnection();

        $query = "INSERT INTO Transport_order (Email, DateTime, Departure_address, Arrival_address, Pasangers, Payment_type, Creation_date)" .
                 " VALUES (?, ?, ?, ?, ?, ?, NOW())";
        $stmt = mysqli_prepare($dbc, $query);

        $email = $orderModelObject->getEmail();
        $date = $orderModelObject->getDate()->format('Y-m-d h:i:s A');
        $from = $orderModelObject->getFrom();
        $to = $orderModelObject->getTo();
        $pasangers = $orderModelObject->getPasangers();
        $payment = $orderModelObject->getPayment();

        mysqli_stmt_bind_param($stmt, "ssssis", $email, $date, $from, $to, $pasangers, $payment);

        mysqli_stmt_execute($stmt);
        $affectedRows = mysqli_stmt_affected_rows($stmt);

        if($affectedRows == 1)
          return 'Order was successfully created.';
        else
          return 'We are sorry, we were not able to process the order...';

        mysqli_stmt_close($stmt);
        mysqli_close($dbc);
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }
  }

?>
