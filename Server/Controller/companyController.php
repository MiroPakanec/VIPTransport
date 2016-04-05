<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/companyInsertDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/companySelectDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/companyUpdateDatabaseAccess.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/companyModel.php';

  session_start();

  class CompanyController{

    public function insertCompanyRow($companyModelObject){

      $companyInsertDatabaseAccessObject = new CompanyInsertDatabaseAccess();
      return $companyInsertDatabaseAccessObject->insertCompanyRow($companyModelObject);
    }

    public function updateCompanyRow($companyModelObject){

      $companyUpdateDatabaseAccessObject = new CompanyUpdateDatabaseAccess();
      $wClause = " WHERE User_email = '".$companyModelObject->getEmail()."'";
      return $companyUpdateDatabaseAccessObject->updateCompanyRow($companyModelObject, $wClause);
    }

    public function updateCompany($name, $address, $ico, $dic){

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

      $companySelectDatabaseAccessObject = new CompanySelectDatabaseAccess();
      $wClause = " WHERE User_email = '".$email."'";
      return $companySelectDatabaseAccessObject->getCompanyData($wClause);
    }

    private function setCompanyModelObject($name, $address, $ico, $dic){

      $companyModelObject = new CompanyModel($_SESSION['email'], $name, $address, $ico, $dic);
      return $companyModelObject;
    }
  }

?>
