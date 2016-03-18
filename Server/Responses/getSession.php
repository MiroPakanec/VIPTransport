<?php


  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/tokenController.php';

  $sessionControllerObject = new SessionController();
  $tokenControllerObject = new TokenController();

  header('Content-Type: text/javascript');
  //return current username to the client

  if(isset($_SESSION["username"]))
    $session = 'in';
  else
    $session = 'out';


  if(isset($_SESSION['token']))
    $token = $tokenControllerObject->getToken();
  else{
    $tokenControllerObject->generateToken();
    $token = $tokenControllerObject->getToken();
  }

  $data = array(
      'session' => $session,
      'token' => $token
  );

  echo json_encode($data);
?>
