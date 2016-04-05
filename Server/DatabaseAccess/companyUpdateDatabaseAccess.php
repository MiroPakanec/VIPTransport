<?php
  //error_reporting(0);

  require_once('databaseConnection.php');
  require_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/companyModel.php';

  class CompanyUpdateDatabaseAccess{

    public function updateCompanyRow($companyModelObject, $wClause){

      try{
        $dbc = DatabaseConnection::openConnection();
        $query = "UPDATE user_company SET Company_name = '".$companyModelObject->getName()."', ".
                                          "Invoice_address = '".$companyModelObject->getAddress()."', ".
                                          "Ico = '".$companyModelObject->getIco()."', ".
                                          "Dic = '".$companyModelObject->getDic()."'".
                                          $wClause;
       $dbc->query($query);

       if($dbc->error)
        return 0;
      else
        return 1;
      }
      catch(Exception $e){

        return 0;
      }
    }
  }
?>
