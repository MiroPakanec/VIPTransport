<?php
  //error_reporting(0);

  require_once('databaseConnection.php');

  class CarDeleteDatabaseAccess{

    public function deleteCar($wClause){

      try{

        $dbc = DatabaseConnection::openConnection();
        $dbc->autocommit(false);
        $errorString = '';

        $queryService = "DELETE FROM car_service ".$wClause;
        $querySticker = "DELETE FROM car_sticker ".$wClause;
        $queryCar = "DELETE FROM car ".$wClause;

        $dbc->query($queryService);
        $errorString .= $dbc->error;
        $dbc->query($querySticker);
        $errorString .= $dbc->error;
        $dbc->query($queryCar);
        $errorString .= $dbc->error;

        //return $errorString.'test';

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

        return 0;
      }
    }
  }

?>
