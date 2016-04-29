<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';

  //header('Content-Type: text/javascript');

  if(isset($_POST['type'])){


    $type = $_POST['type'];
    $email = $_POST['email'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $userControllerObject = new UserController();

    $userModelArray = $userControllerObject->getEmployees($email, $fname, $lname, $type);
    $array = array();
    $arrayUser = array();

    foreach ($userModelArray as $userModelObject) {

      $arrayUser['email'] = $userModelObject->getEmail();
      $arrayUser['fname'] = $userModelObject->getFname();
      $arrayUser['lname'] = $userModelObject->getLname();
      $arrayUser['type'] = $userModelObject->getType();
      $arrayUser['phone'] = $userModelObject->getPhone();

      array_push($array, $arrayUser);
    }

    echo json_encode($array, JSON_PRETTY_PRINT);
  }

?>
