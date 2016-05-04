<?php

    require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/carController.php';

    if(isset($_POST['spz'])){

      $carControllerObject = new CarController();
      $response = $carControllerObject->deleteCar($_POST['spz']);
      echo $response;
    }
    else
      echo '0';

?>
