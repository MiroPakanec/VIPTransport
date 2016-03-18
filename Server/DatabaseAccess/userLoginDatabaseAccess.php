<?php

  require_once('databaseConnection.php');

  class UserLoginDatabaseAccess{

    public function getUserLoginPassword($email){

      try{
        $password = '';

        $dbc = DatabaseConnection::openConnection();
        $query = "SELECT Password FROM User WHERE Email = '" . $email . "'";

        $response = @mysqli_query($dbc, $query);

        if($response){
            while($row = mysqli_fetch_array($response)){

              $password = $row['Password'];
            }
        }

        mysqli_close($dbc);
        return $password;
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }
  }
