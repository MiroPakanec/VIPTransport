<?php

  include_once('databaseConnection.php');
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';

  class UserSelectDatabaseAccess{

    public function getUserData($wClause){

      try{

        $email = $password = $fname = $mname = $lname = $phone = $type = $date = '';

        $dbc = DatabaseConnection::openConnection();
        $query = "SELECT * FROM user " . $wClause;

        $response = @mysqli_query($dbc, $query);
        $array = array();

        if($response){
            while($row = mysqli_fetch_array($response)){

              $email = $row['Email'];
              $password = $row['Password'];
              $fname = $row['First_name'];
              $mname = $row['Middle_name'];
              $lname = $row['Last_name'];
              $phone = $row['Phone'];
              $type = $row['Type'];
              $date = $row['Registration_date'];

              $userModelObject = new UserModel($email, $fname, $mname, $lname, $password, $phone, $type, $date);
              array_push($array, $userModelObject);
            }
        }

        mysqli_close($dbc);

        return $array;
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }

    public function getImage($wClause){

      try{

        $image = 0;

        $dbc = DatabaseConnection::openConnection();
        $query = "SELECT Image FROM user " . $wClause;

        $response = @mysqli_query($dbc, $query);

        if($response){
            while($row = mysqli_fetch_array($response)){

              $image = $row['Image'];
            }
        }

        mysqli_close($dbc);
        return $image;
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }
  }
