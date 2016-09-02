<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/companyInsertDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/companySelectDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/companyUpdateDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/companyModel.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/validationController.php';


  class CompanyController{

    public function insertCompanyRow($companyModelObject){

      $this->startSession();
      $companyInsertDatabaseAccessObject = new CompanyInsertDatabaseAccess();
      return $companyInsertDatabaseAccessObject->insertCompanyRow($companyModelObject);
    }

    public function updateCompanyRow($companyModelObject){

      $this->startSession();
      $companyUpdateDatabaseAccessObject = new CompanyUpdateDatabaseAccess();
      $wClause = " WHERE User_email = '".$companyModelObject->getEmail()."'";
      return $companyUpdateDatabaseAccessObject->updateCompanyRow($companyModelObject, $wClause);
    }

    public function updateCompany($name, $address, $ico, $dic){

      $this->startSession();
      $companyModelObject = $this->getCompanyData($_SESSION['email']);
      if(strlen($companyModelObject->getName()) == 0){

        $companyModelObject = $this->setCompanyModelObject($name, $address, $ico, $dic);
        return $this->insertCompanyRow($companyModelObject);
      }
      else{

        $companyModelObject = $this->setCompanyModelObject($name, $address, $ico, $dic);
        return $this->updateCompanyRow($companyModelObject);
      }
    }

    public function getCompanyData($email){

      $this->startSession();

      $companySelectDatabaseAccessObject = new CompanySelectDatabaseAccess();
      $validationControllerObject = new validationController();

      if($validationControllerObject->validateSessionEmail($email) > 0)
        return $email;

      $wClause = " WHERE User_email = '".$email."'";
      return $companySelectDatabaseAccessObject->getCompanyData($wClause);
    }

    private function startSession(){

      $sessionControllerObject = new SessionController();
      if(!$sessionControllerObject->sessionStarted())
        $sessionControllerObject->startSession();
    }

    private function setCompanyModelObject($name, $address, $ico, $dic){

      $companyModelObject = new CompanyModel($_SESSION['email'], $name, $address, $ico, $dic);
      return $companyModelObject;
    }
  }

?>
