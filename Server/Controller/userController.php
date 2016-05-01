<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userInsertDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userSelectDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/userUpdateDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/validationController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/notificationController.php';

  class UserController{

    public function registerUser($email, $fname, $mname, $lname, $password, $phone, $type){

      $this->startSession();
      $validationControllerObject = new ValidationController();
      $userDataAccessObject = new UserInsertDatabaseAccess();

      if(!isset($_SESSION['type']))
        $type = 'customer';
      else if($_SESSION['type'] != 'manager')
        $type = 'customer';

      $userModelObject = new UserModel($email, $fname, $mname, $lname, $password, $phone, $type, null);

      if($validationControllerObject->validateUser($userModelObject) > 0)
        return 0;

      $userModelObject->setPassword(password_hash($password , PASSWORD_BCRYPT));
      $response = $userDataAccessObject->registerUser($userModelObject);

      $this->notify($response, $userModelObject, 'registration', $this->getRegistrationMessage($userModelObject));

      return $response;
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

    public function updateType($email, $type){

      $this->startSession();
      if($_SESSION['type'] != 'manager' || $_SESSION['email'] == $email)
        return 0;

      $validationControllerObject = new ValidationController();
      $userUpdateDataAccessObject = new userUpdateDatabaseAccess();
      $userModelObject = new UserModel($email, null, null, null, null, null , $type, null);

      if($validationControllerObject->validateUser($userModelObject) > 0)
        return 0;

      $wClause = " WHERE Email = '".$email."'";
      return $userUpdateDataAccessObject->updateType($type, $wClause);
    }

    public function getEmployees($email, $fname, $lname, $type){

      $this->startSession();
      if($_SESSION['type'] != 'manager')
        return 0;

      $validationControllerObject = new ValidationController();
      $wClause = $this->getEmployeesWClause($email, $fname, $lname, $type);
      if($validationControllerObject->validateSearch($email, $fname, $lname, $type) > 0)
        $wClause = " WHERE type = '".$type."'";

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
      $userModelArray = $userDataAccessObject->getUserData($wClause);
      if(sizeof($userModelArray) == 0)
        return 'Incorrect email';

      if(!password_verify($password, $userModelArray[0]->getPassword()))
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

    private function notify($registrationResponse, $userModelObject, $action, $message){

      if($registrationResponse != 'Registration successful')
        return 0;

      $notificationControllerObject = new NotificationController();
      $userArray = $this->getUserEmails($userModelObject->getEmail());

      $errorCounter = 0;
      foreach ($userArray as $userEmail) {

        $notificationArray = $this->createNotificationArray($userEmail, $userModelObject, $message);
        $errorCounter += $notificationControllerObject->createNotification($notificationArray);
      }

      if($errorCounter == 0)
        return 1;

      return 0;
    }


    private function getUserEmails($email){

      $userArray = array();
      array_push($userArray, $email);

      //might need to add managers

      return $userArray;
    }

    private function createNotificationArray($userEmail, $userModelObject, $message){

      $notificationArray = array();
      $notificationText = '<strong><a href="notificationDetailPage.html?type=user&id=You">You</a></strong> are registered!';

      $notificationArray['text'] = $notificationText;
      $notificationArray['reciever'] = $userEmail;
      $notificationArray['type'] = 'user';
      $notificationArray['action'] = 'register';
      $notificationArray['message'] = $message;
      $notificationArray['read'] = false;
      $notificationArray['date'] = date("Y-m-d H:i:s");

      return $notificationArray;
    }

    private function getRegistrationMessage($userModelObject){

      $message = '';

      if($userModelObject->getType() == 'customer')
        $message = 'Welcome to VIPTransport '.$userModelObject->getFname().'! If you wish to create an order, click <a href="newOrderPage.html"><strong>HERE</strong></a>.'.
                   'We wish you a pleasent journey.';
      else if($userModelObject->getType() == 'transporter')
        $message = 'Welcome on board '.$userModelObject->getFname().'! Click <strong><a href="myTransportsPage.html">HERE</a></strong>'.
                   ' and check your scheduled transports. Have a sweet first journey.';
      else if($userModelObject->getType() == 'manager')
        $message = 'Welcome on board '.$userModelObject->getFname().'! We hope you will have a good time with VIPTransport.';

      return $message;
    }

    private function createModelObject($email, $fname, $lname, $type){

      $userModelObject = new UserModel(null, null, null, null, null, null, $type, null);

      if(strlen($email) > 0)
        $userModelObject->setEmail($email);

      if(strlen($fname) > 0)
        $userModelObject->setFname($fname);

      if(strlen($lname) > 0)
        $userModelObject->setLname($lname);

      return $userModelObject;

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
        $wClause = "AND ".$name." LIKE "."'%".$value."%' ";

      return $wClause;
    }
  }

?>
