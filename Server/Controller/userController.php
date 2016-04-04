<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userInsertDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userSelectDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userUpdateDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';

  session_start();

  class UserController{

    public function registerUser($email, $fname, $mname, $lname, $password, $phone){

      $password = password_hash($password , PASSWORD_BCRYPT);
      $userModelObject = new UserModel($email, $fname, $mname, $lname, $password, $phone, '', '');
      $userDataAccessObject = new UserInsertDatabaseAccess();
      return $userDataAccessObject->registerUser($userModelObject);
    }

    public function updateUser($email, $fname, $mname, $lname, $phone){

      $userDataAccessObject = new userUpdateDatabaseAccess();
      $userModelObject = new UserModel($email, $fname, $mname, $lname, '', $phone, '', '');
      $wClause = " WHERE Email = '".$_SESSION['email']."'";

      $response = $userDataAccessObject->updateUser($userModelObject, $wClause);
      if($response == 1){

        $sessionControllerObject = new SessionController();
        $sessionControllerObject->setSessionData($userModelObject->getEmail());
      }
      return $response;
    }

    public function updatePassword($current, $new, $newRepeat){

      $userSelectDataAccessObject = new UserSelectDatabaseAccess();
      $userUpdateDataAccessObject = new userUpdateDatabaseAccess();

      //get users password from DB
      $wClause = " WHERE Email = '" . $_SESSION['email'] . "'";
      $userModelObject = $userSelectDataAccessObject->getUserData($wClause);

      if(!$this->validatePassword($current, $new, $newRepeat, $userModelObject->getPassword()))
        return 0;

      $userModelObject->setPassword(password_hash($new , PASSWORD_BCRYPT));
      return $userUpdateDataAccessObject->updatePassword($userModelObject->getPassword(), $wClause);
    }

    public function loginUser($email, $password, $token){

      $userDataAccessObject = new UserSelectDatabaseAccess();
      $wClause = " WHERE Email = '" . $email . "'";

      //get populated user model from db
      $userModelObject = $userDataAccessObject->getUserData($wClause);

      if(strlen($userModelObject->getPassword()) == 0)
        return 'Incorrect email';

      if(!password_verify($password, $userModelObject->getPassword()))
        return 'Incorrect password';
      else
        return 'in';
    }

    public function updateImage($image){

      $userDataAccessObject = new userUpdateDatabaseAccess();
      $wClause = " WHERE Email = '" . $_SESSION['email'] . "'";

      return $userDataAccessObject->updateImage($image, $wClause);
    }

    public function getImage($email){

      $userDataAccessObject = new userSelectDatabaseAccess();
      $wClause = " WHERE Email = '" . $email . "'";

      return $userDataAccessObject->getImage($wClause);
    }

    private function validatePassword($currentPassword, $newPassword, $newPasswordRepeat, $storedPassword){

      if(!$this->validateCorrectPassword($currentPassword, $storedPassword))
        return 0;

      if(!$this->validatePasswordMatch($newPassword, $newPasswordRepeat))
        return 0;

      return 1;
    }

    private function validateCorrectPassword($password, $storedPassword){

      if(!password_verify($password, $storedPassword))
        return 0;
      else
        return 1;
    }

    private function validatePasswordMatch($password, $passwordRepeat){

      if($password != $passwordRepeat)
        return 0;
      else
        return 1;
    }
  }

?>
