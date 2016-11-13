<?php
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/submitController.php';

  if(isset($_POST['orderId'], $_POST['routeId'], $_POST['email'], $_POST['date'], $_POST['from'], $_POST['to'], $_POST['price'], $_POST['duration'], $_POST['distance'], $_POST['car'])){

    $submitControllerObject = new SubmitController();
    $response = $submitControllerObject->SubmitRoute($_POST['orderId'], $_POST['routeId'], $_POST['email'], $_POST['date'], $_POST['from'], $_POST['to'], $_POST['price'], $_POST['duration'], $_POST['distance'], $_POST['car']);

    echo $response;
  }
?>
