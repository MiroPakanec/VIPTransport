<?php

  require_once('databaseConnection.php');
  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';

  class UserInsertDatabaseAccess{

    public function registerUser($userModelObject){

      try{

        $dbc = DatabaseConnection::openConnection();

        $query = "INSERT INTO user (Email, First_name, Middle_name, Last_name, Password, Phone, Type, Registration_date)" .
                 " VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
        $stmt = mysqli_prepare($dbc, $query);

        $email = $userModelObject->getEmail();
        $fname = $userModelObject->getFname();
        $mname = $userModelObject->getMname();
        $lname = $userModelObject->getLname();
        $password = $userModelObject->getPassword();
        $phone = $userModelObject->getPhone();
        $type = $userModelObject->getType();

        mysqli_stmt_bind_param($stmt, "sssssss", $email, $fname, $mname, $lname, $password, $phone, $type);

        mysqli_stmt_execute($stmt);
        $affectedRows = mysqli_stmt_affected_rows($stmt);

        if($affectedRows == 1)
          return 1;
        else
          return 2;

        mysqli_stmt_close($stmt);
        mysqli_close($dbc);
      }
      catch(Exception $e){

        return -1;
      }
    }
  }

?>
