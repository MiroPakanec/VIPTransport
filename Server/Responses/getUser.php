<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';

  header('Content-Type: text/javascript');

  if(isset($_POST['email'])){

    $sessionControllerObject = new SessionController();
    $userControllerObject = new UserController();

    if(!$sessionControllerObject->sessionStarted())
      $sessionControllerObject->startSession();

    $email = $_POST['email'];
    if($email == 'you')
      $email = $_SESSION['email'];

    $wClause = " WHERE Email = '".$email."'";
    $userModelObject = $userControllerObject->getUserData($wClause)[0];

    //model to array
    $array = array();
    $array['email'] = $userModelObject->getEmail();
    $array['fname'] = $userModelObject->getFname();
    $array['mname'] = $userModelObject->getMname();
    $array['lname'] = $userModelObject->getLname();
    $array['phone'] = $userModelObject->getPhone();
    $array['type'] = $userModelObject->getType();
    $array['registrationDate'] = $userModelObject->getRegistrationDate();

    $response = json_encode($array);

    //response to client
    echo $response;
  }

?>
