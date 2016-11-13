<?php
  require_once('databaseConnection.php');

  class TransportCustomDatabaseAccess{

    public function GetTransports($wClause){

      try{
        $dbc = DatabaseConnection::openConnection();
        $query = "SELECT * FROM transport_custom " . $wClause. " ORDER BY Id DESC";
        $response = @mysqli_query($dbc, $query);

        $orderId = $date = $from = $to = $price = $duration = $distance = '';
        $transports = array();

        if($response){
            while($row = mysqli_fetch_array($response)){

              $transport = array();
              $transport['orderId'] = $row['OrderId'];
              $transport['date'] = $row['Date'];
              $transport['from'] = $row['From'];
              $transport['to'] = $row['To'];
              $transport['price'] = $row['Price'];
              $transport['duration'] = $row['Duration'];
              $transport['distance'] = $row['Distance'];

              array_push($transports, $transport);
            }
        }
        mysqli_close($dbc);
        return $transports;
      }
      catch(Exception $e){

        return -1;
      }
    }
  }
?>
