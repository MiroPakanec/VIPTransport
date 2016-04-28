<?php

    require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/companyController.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/companyModel.php';

    if(isset($_GET['email'])){
      $companyControllerObject = new CompanyController();
      $companyModelObject = $companyControllerObject->getCompanyData($_GET['email']);
      $array = array();

      header('Content-Type: text/javascript');

      $array['name'] = $companyModelObject->getName();
      $array['address'] = $companyModelObject->getAddress();
      $array['ico'] = $companyModelObject->getIco();
      $array['dic'] = $companyModelObject->getDic();

      echo json_encode($array, JSON_PRETTY_PRINT);
    }
?>
