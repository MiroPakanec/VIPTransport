<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/transportController.php';

if(isset($_POST['order'], $_POST['route'], $_POST['transport'], $_POST['employee'], $_POST['company'])){

  $transportControllerObject = new TransportController();
  $responseArray = $transportControllerObject->insertTransport($_POST['order'], $_POST['route'],
                                          $_POST['transport'], $_POST['employee'], $_POST['company']);
  echo $responseArray;
}


?>
