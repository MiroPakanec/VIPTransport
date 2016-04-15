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
        $email = $dbc->real_escape_string(trim($orderModelObject->getEmail()));
        $date = $dbc->real_escape_string(trim($orderModelObject->getDate()->format('Y-m-d h:i:s A')));
        $from = $dbc->real_escape_string(trim($orderModelObject->getFrom()));
        $to = $dbc->real_escape_string(trim($orderModelObject->getTo()));
        $pasangers = $dbc->real_escape_string(trim($orderModelObject->getPasangers()));
        $payment = $dbc->real_escape_string(trim($orderModelObject->getPayment()));
        $names = $orderModelObject->getNames();

        $query = "UPDATE Transport_order  SET ".
                 "Email = '{$email}', DateTime = '{$date}', Departure_address = '{$from}', Arrival_address = '{$to}',".
                 "Pasangers = '{$pasangers}', Payment_type = '{$payment}', Status = 'Stand by' WHERE Id=".$id;

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
        if(strpos($error, 'n')){
          $dbc->commit();
          return 2;
        }
        else if(strpos($error, 'e')){
          return 4;
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
  }

?>
