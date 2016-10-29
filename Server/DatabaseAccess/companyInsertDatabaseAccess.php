<?php
  //error_reporting(0);

  require_once('databaseConnection.php');
  require $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/companyModel.php';

  class CompanyInsertDatabaseAccess{

    public function insertCompanyRow($companyModelObject){

      try{

        $dbc = DatabaseConnection::openConnection();

        $email = $dbc->real_escape_string(trim($_SESSION['email']));
        $name = $dbc->real_escape_string(trim($companyModelObject->getName()));
        $address = $dbc->real_escape_string(trim($companyModelObject->getAddress()));
        $ico = $dbc->real_escape_string(trim($companyModelObject->getIco()));
        $dic = $dbc->real_escape_string(trim($companyModelObject->getDic()));

        $query = "INSERT INTO user_company (User_email, Company_name, Invoice_address, Ico, Dic)" .
                 " VALUES ('{$email}', '{$name}', '{$address}', '{$ico}', '{$dic}')";

        $dbc->query($query);
        if($dbc->error)
         return 0;
       else
         return 1;
      }
      catch(Exception $e){

        return -1;
      }
    }
  }

?>
