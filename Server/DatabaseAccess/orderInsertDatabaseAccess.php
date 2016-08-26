<?php
  //error_reporting(0);

  require_once('databaseConnection.php');
  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';

  class OrderInsertDatabaseAccess{

    public function createOrder($orderModelObject){

      try{

        $dbc = DatabaseConnection::openConnection();

        $email = $dbc->real_escape_string(trim($orderModelObject->getEmail()));
        $date = $dbc->real_escape_string(trim($orderModelObject->getDate()->format('Y-m-d h:i:s A')));
        $from = $dbc->real_escape_string(trim($orderModelObject->getFrom()));
        $to = $dbc->real_escape_string(trim($orderModelObject->getTo()));
        $pasangers = $dbc->real_escape_string(trim($orderModelObject->getPasangers()));
        $payment = $dbc->real_escape_string(trim($orderModelObject->getPayment()));
        $phone = $dbc->real_escape_string(trim($orderModelObject->getPhone()));

        $query = "INSERT INTO transport_order (Email, DateTime, Departure_address, Arrival_address, Pasangers, Payment_type, Phone, Creation_date, Status)" .
                 " VALUES ('{$email}', '{$date}', '{$from}', '{$to}', '{$pasangers}', '{$payment}', '{$phone}', NOW(), 'Stand by')";

        $dbc->query($query);
        $id = $dbc->insert_id;
        return $id;
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }

    public function createOrderNames($orderModelObject){

      try{

        $dbc = DatabaseConnection::openConnection();
        $dbc->autocommit(false);
        $names = $orderModelObject->getNames();
        $id = $dbc->real_escape_string(trim($orderModelObject->getId()));

        $totalRows = 0;

        foreach ($orderModelObject->getNames() as $element) {

          $name = $dbc->real_escape_string(trim($element));

          $query = "INSERT INTO pasanger_name (Order_id, Pasanger_name)" .
                   " VALUES ('{$id}', '{$name}')";

          $dbc->query($query);
          if($dbc->affected_rows == 1)
            $totalRows++;
        }

        if($totalRows == $orderModelObject->getPasangers()){

          $dbc->commit();
          return 1;
        }

        return 0;
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }
  }

?>
