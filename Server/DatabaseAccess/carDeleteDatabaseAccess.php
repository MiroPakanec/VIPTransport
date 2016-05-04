<?php
  //error_reporting(0);

  require_once('databaseConnection.php');

  class CarDeleteDatabaseAccess{

    public function deleteCar($wClause){

      try{

        $dbc = DatabaseConnection::openConnection();

        $query = "DELETE FROM car ".$wClause;
        $dbc->query($query);
        return $dbc->affected_rows;
      }
      catch(Exception $e){

        return 0;
      }
    }
  }

?>
