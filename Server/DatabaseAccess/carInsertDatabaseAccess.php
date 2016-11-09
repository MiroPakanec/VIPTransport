<?php
  //error_reporting(0);

  require_once('databaseConnection.php');
  require_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/carModel.php';

  class CarInsertDatabaseAccess{

    public function insertCar($carModelObject){

      try{

        $errorString = '';
        $dbc = DatabaseConnection::openConnection();
        $dbc->autocommit(false);

        $carInsertQuery = $this->getCarInsertQuery($dbc, $carModelObject);
        $stickerInsertArray = $this->getStickerInsertQueryArray($dbc, $carModelObject);
        $serviceInsertArray = $this->getServiceInsertQueryArray($dbc, $carModelObject);

        $dbc = $this->processCarInsert($dbc, $carInsertQuery);
        $errorString .= $dbc->error;
        $dbc = $this->processArrayInsert($dbc, $stickerInsertArray);
        $errorString .= $dbc->error;
        $dbc = $this->processArrayInsert($dbc, $serviceInsertArray);
        $errorString .= $dbc->error;

        if(strlen($errorString) == 0){

            $dbc->commit();
            return 1;
        }
        else{

            $dbc->rollback();
            return 0;
        }
      }
      catch(Exception $e){

        $dbc->rollback();
        return -1;
      }
    }

    private function processCarInsert($dbc, $query){

      $dbc->query($query);
      return $dbc;
    }

    private function processArrayInsert($dbc, $insertQueryArray){

      if(empty($insertQueryArray))
        return $dbc;

      foreach ($insertQueryArray as $insertQuery) {

        $dbc->query($insertQuery);
      }

      return $dbc;
    }

    private function getCarInsertQuery($dbc, $carModelObject){

      try{

        $spz = $dbc->real_escape_string(trim($carModelObject->getSpz()));
        $brand = $dbc->real_escape_string(trim($carModelObject->getBrand()));
        $type = $dbc->real_escape_string(trim($carModelObject->getType()));
        $seats = $dbc->real_escape_string(trim($carModelObject->getSeats()));
        $state = $dbc->real_escape_string(trim($carModelObject->getState()));
        $emissionCheck = $dbc->real_escape_string(trim($carModelObject->getEmissionCheck()));
        $stk = $dbc->real_escape_string(trim($carModelObject->getStk()));
        $mandatoryInsurance = $dbc->real_escape_string(trim($carModelObject->getMandatoryInsurance()));
        $accidentInsurance = $dbc->real_escape_string(trim($carModelObject->getAccidentInsurance()));
        $mealige = $dbc->real_escape_string(trim($carModelObject->getMealige()));
        $relativeMealige = $dbc->real_escape_string(trim($carModelObject->getRelativeMealige()));

        $queryCar = "INSERT into car (Spz, Brand, Type, Seats, State, Emission_check, Stk, Mandatory_insurance, Accident_insurance, ".
                 "Mealige, Relative_mealige) VALUES ('{$spz}', '{$brand}', '{$type}', '{$seats}', '{$state}', '{$emissionCheck}', ".
                 "'{$stk}', '{$mandatoryInsurance}', '{$accidentInsurance}', '{$mealige}', '{$relativeMealige}')";

        return $queryCar;
      }
      catch(Exception $e){

        return -1;
      }
    }

    private function getStickerInsertQueryArray($dbc, $carModelObject){

      $spz = $dbc->real_escape_string(trim($carModelObject->getSpz()));
      $stickers = $carModelObject->getStickers();
      $insertQueryArray = array();

      if(empty($stickers))
        return $insertQueryArray;

      foreach ($stickers as $sticker) {

         $query = $this->getStickerInsertQuery($dbc, $sticker, $spz);
         array_push($insertQueryArray, $query);
      }

      return $insertQueryArray;
    }

    private function getServiceInsertQueryArray($dbc, $carModelObject){

      $spz = $dbc->real_escape_string(trim($carModelObject->getSpz()));
      $services = $carModelObject->getServices();
      $insertQueryArray = array();

      if(empty($services))
        return $insertQueryArray;

      foreach ($services as $service) {

         $query = $this->getServiceInsertQuery($dbc, $service, $spz);
         array_push($insertQueryArray, $query);
      }

      return $insertQueryArray;
    }

    private function getWClause($dbc, $carModelObject){

      $spz = $dbc->real_escape_string(trim($carModelObject->getSpz()));
      $wClause = " WHERE Spz = '{$spz}'";
      return $wClause;
    }

    private function getStickerInsertQuery($dbc, $sticker, $spz){

      $country = $dbc->real_escape_string(trim($sticker['country']));
      $expirationDate = $dbc->real_escape_string(trim($sticker['expirationDate']));

      $query = "INSERT INTO car_sticker (Spz, Country, Expiration_date)" .
               " VALUES ('{$spz}', '{$country}', '{$expirationDate}')";

      return $query;
    }

    private function getServiceInsertQuery($dbc, $service, $spz){

      $issue = $dbc->real_escape_string(trim($service['issue']));
      $mealige = $dbc->real_escape_string(trim($service['mealige']));
      $repareDate = $dbc->real_escape_string(trim($service['repareDate']));

      $query = "INSERT INTO car_service (Spz, Issue, Repare_date, Mealige)" .
               " VALUES ('{$spz}', '{$issue}', '{$repareDate}', '{$mealige}')";
      return $query;
    }
  }

?>
