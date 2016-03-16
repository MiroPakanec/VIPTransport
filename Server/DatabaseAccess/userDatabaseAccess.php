<?php

  require('databaseConnection.php');
  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';

  class UserDatabaseAccess{

    public function registerUser($userModelObject){

      try{

        $dbc = DatabaseConnection::openConnection();

        $query = "INSERT INTO User (Username, First_name, Middle_name, Last_name, Password, Email, Phone, Type, Registration_date)" .
                 " VALUES (?, ?, ?, ?, ?, ?, ?, 'customer', NOW())";
        $stmt = mysqli_prepare($dbc, $query);

        $username = $userModelObject->getUsername();
        $fname = $userModelObject->getFname();
        $mname = $userModelObject->getMname();
        $lname = $userModelObject->getLname();
        $password = $userModelObject->getPassword();
        $email = $userModelObject->getEmail();
        $phone = $userModelObject->getPhone();

        mysqli_stmt_bind_param($stmt, "sssssss", $username, $fname, $mname, $lname, $password, $email, $phone);

        mysqli_stmt_execute($stmt);
        $affectedRows = mysqli_stmt_affected_rows($stmt);

        if($affectedRows == 1)
          return 'Registration successful';
        else
          return 'We are sorry, username already exists...';

        mysqli_stmt_close($stmt);
        mysqli_close($dbc);
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }
  }

?>
