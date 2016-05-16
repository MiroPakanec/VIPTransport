<?php

  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/statisticsController.php';

  if(isset($_GET['group'], $_GET['type'], $_GET['query'])){

    $statisticsControllerObject = new StatisticsController();
    $response = $statisticsControllerObject->getStatistics($_GET['group'], $_GET['type'], $_GET['query']);
    echo $response;
  }
?>
