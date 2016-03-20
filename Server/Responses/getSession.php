<?php


  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/tokenController.php';

  session_start();

  $sessionControllerObject = new SessionController();
  $tokenControllerObject = new TokenController();

  header('Content-Type: text/javascript');
  //return current username to the client

  $email = $fname = $mname = $lname = $phone = $type = $date = '';

  if(isset($_SESSION["email"])){

    //$sessionControllerObject->startSession();
    $email = $_SESSION['email'];
    $fname = $_SESSION['fname'];
    $mname = $_SESSION['mname'];
    $lname = $_SESSION['lname'];
    $phone = $_SESSION['phone'];
    $type = $_SESSION['type'];
    $date = $_SESSION['registrationDate'];
  }

  if(isset($_SESSION['token']))
    $token = $tokenControllerObject->getToken();
  else{
    //$sessionControllerObject->startSession();
    $tokenControllerObject->generateToken();
    $token = $tokenControllerObject->getToken();
  }

  $data = array(
      'token' => $token,
      'email' => $email,
      'fname' => $fname,
      'mname' => $mname,
      'lname' => $lname,
      'phone' => $phone,
      'type' => $type,
      'date' => $date
  );

  echo json_encode($data);
?>
