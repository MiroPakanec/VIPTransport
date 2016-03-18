<?php

  require_once('databaseConnection.php');
  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';

  class UserRegistrationDatabaseAccess{

    public function registerUser($userModelObject){

      try{

        $dbc = DatabaseConnection::openConnection();

        $query = "INSERT INTO User (Email, First_name, Middle_name, Last_name, Password, Phone, Type, Registration_date)" .
                 " VALUES (?, ?, ?, ?, ?, ?, 'customer', NOW())";
        $stmt = mysqli_prepare($dbc, $query);

        $email = $userModelObject->getEmail();
        $fname = $userModelObject->getFname();
        $mname = $userModelObject->getMname();
        $lname = $userModelObject->getLname();
        $password = $userModelObject->getPassword();
        $phone = $userModelObject->getPhone();

        mysqli_stmt_bind_param($stmt, "ssssss", $email, $fname, $mname, $lname, $password, $phone);

        mysqli_stmt_execute($stmt);
        $affectedRows = mysqli_stmt_affected_rows($stmt);

        if($affectedRows == 1)
          return 'Registration successful';
        else
          return 'We are sorry, this email is already in use...';

        mysqli_stmt_close($stmt);
        mysqli_close($dbc);
      }
      catch(Exception $e){

        return 'We are sorry, something went wrong...';
      }
    }
  }

?>
