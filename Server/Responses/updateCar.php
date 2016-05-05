<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/carController.php';


  if(isset($_POST['spz'], $_POST['brand'], $_POST['type'], $_POST['seats'], $_POST['state'], $_POST['emissionCheck'],
            $_POST['mandatoryInsurance'], $_POST['accidentInsurance'], $_POST['mealige'], $_POST['relativeMealige'], $_POST['action'])){


    $stickers = $services = '';

    if(isset($_POST['stickers']))
      $stickers = $_POST['stickers'];

    if(isset($_POST['services']))
      $services = $_POST['services'];

    $carControllerObject = new CarController();

    $response = $carControllerObject->manageCar($_POST['spz'], $_POST['brand'], $_POST['type'], $_POST['seats'], $_POST['state'], $_POST['emissionCheck'],
                    $_POST['stk'], $_POST['mandatoryInsurance'], $_POST['accidentInsurance'], $_POST['mealige'],
                    $_POST['relativeMealige'], $stickers, $services, $_POST['action']);


    echo $response;
  }

?>
