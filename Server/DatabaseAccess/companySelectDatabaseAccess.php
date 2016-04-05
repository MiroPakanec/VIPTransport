<?php

  include_once('databaseConnection.php');
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/companyModel.php';

  class CompanySelectDatabaseAccess{

    public function getCompanyData($wClause){

      try{

        $email = $name = $address = $ico = $dic = '';
        $dbc = DatabaseConnection::openConnection();
        $query = "SELECT * FROM user_company " . $wClause;

        $response = @mysqli_query($dbc, $query);

        if($response){
            while($row = mysqli_fetch_array($response)){

              $email = $row['User_email'];
              $name = $row['Company_name'];
              $address = $row['Invoice_address'];
              $ico = $row['Ico'];
              $dic = $row['Dic'];

              $companyModelObject = new CompanyModel($email, $name, $address, $ico, $dic);
              return $companyModelObject;
            }
        }

        mysqli_close($dbc);

        return $this->createEmptyCompanyModelObject();
      }
      catch(Exception $e){

        return $this->createEmptyCompanyModelObject();
      }
    }

    private function createEmptyCompanyModelObject(){

      $companyModelObject = new CompanyModel('', '', '', '', '');
      return $companyModelObject;
    }
  }
