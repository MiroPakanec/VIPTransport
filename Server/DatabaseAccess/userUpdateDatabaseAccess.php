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

    public function updateUser($userModelObject, $wClause){

      try{
        $dbc = DatabaseConnection::openConnection();
        $query = "UPDATE user SET Email = '".$userModelObject->getEmail()."', ".
                                 "First_name = '".$userModelObject->getFname()."', ".
                                 "Middle_name = '".$userModelObject->getMname()."', ".
                                 "Last_name = '".$userModelObject->getLname()."', ".
                                 "Phone = '".$userModelObject->getPhone()."' ".
                                  $wClause;
       $dbc->query($query);

       if($dbc->error)
        return 0;
      else
        return 1;
      }
      catch(Exception $e){

        return 0;
      }
    }

    public function updatePassword($password, $wClause){

      try{

        $dbc = DatabaseConnection::openConnection();
        $query = "UPDATE user SET Password = '".$password."' ".$wClause;
        $dbc->query($query);

        if($dbc->error)
          return 0;
        else
          return 1;
      }
      catch(Exception $e){

        return 0;
      }
    }
  }
