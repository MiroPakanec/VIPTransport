<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userInsertDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userSelectDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userUpdateDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/validationController.php';

  class UserController{

    public function registerUser($email, $fname, $mname, $lname, $password, $phone){

      $this->startSession();
      $validationControllerObject = new ValidationController();
      $userDataAccessObject = new UserInsertDatabaseAccess();
      $userModelObject = new UserModel($email, $fname, $mname, $lname, $password, $phone, null, null);

      if($validationControllerObject->validateUser($userModelObject) > 0)
        return 0;

      $userModelObject->setPassword(password_hash($password , PASSWORD_BCRYPT));
      return $userDataAccessObject->registerUser($userModelObject);
    }

    public function updateUser($email, $fname, $mname, $lname, $phone){

      $this->startSession();
      $userDataAccessObject = new userUpdateDatabaseAccess();
      $validationControllerObject = new ValidationController();

      $userModelObject = new UserModel($email, $fname, $mname, $lname, null, $phone, null, null);

      if($validationControllerObject->validateUser($userModelObject) > 0)
        return 0;

      $wClause = " WHERE Email = '".$_SESSION['email']."'";

      $response = $userDataAccessObject->updateUser($userModelObject, $wClause);
      if($response == 1){

        $sessionControllerObject = new SessionController();
        $sessionControllerObject->setSessionData($userModelObject->getEmail());
      }
      return $response;
    }

    public function updatePassword($current, $new, $newRepeat){

      $this->startSession();
      $userSelectDataAccessObject = new UserSelectDatabaseAccess();
      $userUpdateDataAccessObject = new userUpdateDatabaseAccess();
      $validationControllerObject = new ValidationController();

      //get users password from DB
      $wClause = " WHERE Email = '" . $_SESSION['email'] . "'";
      $userModelObject = $this->getUserData($wClause)[0];

      if($validationControllerObject->validatePassword($current, $new, $newRepeat, $userModelObject->getPassword()) > 0)
        return 0;

      $userModelObject->setPassword(password_hash($new , PASSWORD_BCRYPT));
      return $userUpdateDataAccessObject->updatePassword($userModelObject->getPassword(), $wClause);
    }

    public function getEmployees($email, $fname, $lname, $type){

      $this->startSession();
      if($_SESSION['type'] != 'manager')
        return 0;

      $wClause = $this->getEmployeesWClause($email, $fname, $lname, $type);
      return $this->getUserData($wClause);
    }

    public function getUserData($wClause){

      $this->startSession();
      $userSelectDataAccessObject = new UserSelectDatabaseAccess();
      return $userSelectDataAccessObject->getUserData($wClause);
    }

    public function loginUser($email, $password, $token){

      $this->startSession();
      $userDataAccessObject = new UserSelectDatabaseAccess();
      $validationControllerObject = new ValidationController();
      $userModelObject = new UserModel($email, null, null, null, $password, null, null, null);

      if($validationControllerObject->validateUser($userModelObject) > 0)
        return 'Please enter valid email and password';

      $wClause = " WHERE Email = '" . $email . "'";

      //get populated user model from db
      $userModelObject = $userDataAccessObject->getUserData($wClause)[0];

      if(strlen($userModelObject->getPassword()) == 0)
        return 'Incorrect email';

      if(!password_verify($password, $userModelObject->getPassword()))
        return 'Incorrect password';
      else
        return 'in';
    }

    public function updateImage($image){

      $this->startSession();
      $userDataAccessObject = new userUpdateDatabaseAccess();
      $wClause = " WHERE Email = '" . $_SESSION['email'] . "'";

      return $userDataAccessObject->updateImage($image, $wClause);
    }

    public function getImage($email){

      $userDataAccessObject = new userSelectDatabaseAccess();
      $wClause = " WHERE Email = '" . $email . "'";

      return $userDataAccessObject->getImage($wClause);
    }

    private function startSession(){

      $sessionControllerObject = new SessionController();
      if(!$sessionControllerObject->sessionStarted())
        $sessionControllerObject->startSession();
    }

    private function getEmployeesWClause($email, $fname, $lname, $type){

      $wClause = " WHERE Type = '".$type."' ";

      $wClause .= $this->appendWClauseAttribute($email, 'Email');
      $wClause .= $this->appendWClauseAttribute($fname, 'First_name');
      $wClause .= $this->appendWClauseAttribute($lname, 'Last_name');

      return $wClause;
    }

    private function appendWClauseAttribute($value, $name){

      $wClause = '';

      if(strlen($value) > 0)
        $wClause = "AND ".$name." = "."'".$value."' ";

      return $wClause;
    }
  }

?>
