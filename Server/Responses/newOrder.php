<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/orderController.php';

  if(isset($_POST['Clock'],$_POST['Date'], $_POST['TimeHour'],
        $_POST['TimeMinute'],$_POST['From'], $_POST['To'], $_POST['Email'],
        $_POST['Pasangers'],$_POST['Payment'], $_POST['Phone'], $_POST['Operation'])){

    $namesError = '';
    $names = $_POST['Names'];

    for($i = 0; $i < $_POST['Pasangers']; $i++){

        if(strlen(array_values($names)[$i]) == 0){

          $namesError .= 'Pasanger '.($i+1).' is empty'.'</br>';
        }
    }

    $orderControllerObject = new OrderController();

    if($_POST['Operation'] == 'create')
      $response = $orderControllerObject->crearteOrder($_POST['Email'], $_POST['Date'], $_POST['TimeHour'], $_POST['TimeMinute'], $_POST['Clock'],
                                $_POST['From'], $_POST['To'], $_POST['Pasangers'], $_POST['Payment'], $_POST['Phone'], $_POST['Names']);

    else if($_POST['Operation'] == 'update')
      $response = $orderControllerObject->updateOrder($_POST['Id'], $_POST['Email'], $_POST['Date'], $_POST['TimeHour'], $_POST['TimeMinute'], $_POST['Clock'],
                                $_POST['From'], $_POST['To'], $_POST['Pasangers'], $_POST['Payment'], $_POST['Phone'], $_POST['Names']);

    echo($response);
  }

?>
