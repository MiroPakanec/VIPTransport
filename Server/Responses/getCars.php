<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/carController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/carModel.php';

  header('Content-Type: text/javascript');


  $sessionControllerObject = new SessionController();
  $carControllerObject = new CarController();

  $spz = '';
  if(isset($_POST['spz']))
    $spz = $_POST['spz'];

  $carModelArray = $carControllerObject->getCars($spz);

  //model to array
  $array = array();
  $index = 0;

  foreach ($carModelArray as $carModelObject) {

    $carArray = array();
    $carArray['Spz'] = $carModelObject->getSpz();
    $carArray['Brand'] = $carModelObject->getBrand();
    $carArray['Type'] = $carModelObject->getType();
    $carArray['Seats'] = $carModelObject->getSeats();
    $carArray['State'] = $carModelObject->getState();
    $carArray['EmissionCheck'] = $carModelObject->getEmissionCheck();
    $carArray['Stk'] = $carModelObject->getStk();
    $carArray['MandatoryInsurance'] = $carModelObject->getMandatoryInsurance();
    $carArray['AccidentInsurance'] = $carModelObject->getAccidentInsurance();
    $carArray['Mealige'] = $carModelObject->getMealige();
    $carArray['RelativeMealige'] = $carModelObject->getRelativeMealige();

    //services
    $carServicesArray = array();
    $indexService = 0;
    foreach ($carModelObject->getServices() as $carServiceModel) {

      $serviceArray = array();
      $serviceArray['Id'] = $carServiceModel->getId();
      $serviceArray['Spz'] = $carServiceModel->getSpz();
      $serviceArray['Issue'] = $carServiceModel->getIssue();
      $serviceArray['RepareDate'] = $carServiceModel->getRepareDate();
      $serviceArray['Mealige'] = $carServiceModel->getMealige();

      $indexService++;
      $carServicesArray['Service '.$indexService] = $serviceArray;
    }
    $carArray['Services'] = $carServicesArray;

    //stickers
    $carStickerArray = array();
    $indexSticker = 0;
    foreach ($carModelObject->getStickers() as $carStickerModel) {

      $stickerArray = array();
      $stickerArray['Spz'] = $carStickerModel->getSpz();
      $stickerArray['Country'] = $carStickerModel->getCountry();
      $stickerArray['ExpirationDate'] = $carStickerModel->getExpirationDate();

      $indexSticker++;
      $carStickerArray['Sticker '.$indexSticker] = $stickerArray;
    }
    $carArray['Stickers'] = $carStickerArray;

    $index++;
    $array['car'.$index] = $carArray;
  }

  $response = json_encode($array);
  echo $response;

?>
