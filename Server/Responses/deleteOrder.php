<?php

    require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/orderController.php';

    if(isset($_POST['id'])){

      $orderControllerObject = new OrderController();
      $response = $orderControllerObject->deleteOrder($_POST['id']);
      echo $response;
    }
    else
      echo '0';

?>
