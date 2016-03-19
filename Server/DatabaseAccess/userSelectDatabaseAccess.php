<?php

  include_once('databaseConnection.php');
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';

  class UserSelectDatabaseAccess{

    public function getUserData($wClause){

      try{

        $email = $password = $fname = $mname = $lname = $phone = '';

        $dbc = DatabaseConnection::openConnection();
        $query = "SELECT * FROM User " . $wClause;

        $response = @mysqli_query($dbc, $query);

        if($response){
            while($row = mysqli_fetch_array($response)){

              $email = $row['Email'];
              $password = $row['Password'];
              $fname = $row['First_name'];
              $mname = $row['Middle_name'];
              $lname = $row['Last_name'];
              $phone = $row['Phone'];
            }
        }

        mysqli_close($dbc);

        $userModelObject = new UserModel($email, $fname, $mname, $lname, $password, $phone);
        return $userModelObject;
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }
  }
