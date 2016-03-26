<?php
  //error_reporting(0);

  require_once('databaseConnection.php');

  class OrderDeleteDatabaseAccess{

    public function deleteOrder($wClause){

      try{

        $dbc = DatabaseConnection::openConnection();

        $query = "DELETE FROM transport_order ".$wClause;
        $dbc->query($query);
        return $dbc->affected_rows;
      }
      catch(Exception $e){

        return 0;
      }
    }
  }

?>
