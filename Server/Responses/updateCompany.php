<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/companyController.php';

if(!isset($_POST['companyName'], $_POST['invoiceAddress'], $_POST['ico'], $_POST['dic']))
  return 0;

$companyControllerObject = new CompanyController();

$response = $companyControllerObject->updateCompany(
        $_POST['companyName'],
        $_POST['invoiceAddress'],
        $_POST['ico'],
        $_POST['dic']
      );

  //response to client
  echo $response;

?>
