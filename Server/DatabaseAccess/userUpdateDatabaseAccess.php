<?php

  include_once('databaseConnection.php');
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';

  class UserUpdateDatabaseAccess{

    public function updateImage($image, $wClause){

      try{

        $dbc = DatabaseConnection::openConnection();
        $query = "UPDATE user SET Image = '".$image."' ".$wClause;

        $dbc->query($query);
        if($dbc->affected_rows == 0)
          return 0;
        else
          return 1;
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }
  }
