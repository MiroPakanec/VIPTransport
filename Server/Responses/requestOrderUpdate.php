<?php

    require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/orderController.php';

    if(isset($_POST['id']) && isset($_POST['message'])){

      $orderControllerObject = new OrderController();
      $response = $orderControllerObject->requestUpdate($_POST['id'], $_POST['message']);
      echo $response;
    }
    else
      echo '0';

?>
