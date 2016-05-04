<?php
  //error_reporting(0);

  require_once('databaseConnection.php');
  require_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/carModel.php';

  class CarUpdateDatabaseAccess{

    public function updateCar($carModelObject){

      try{

        $carSuccess = $stickerSuccess = $serviceSuccess = false;

        $dbcCar = DatabaseConnection::openConnection();
        $dbcStickers = DatabaseConnection::openConnection();
        $dbcServices = DatabaseConnection::openConnection();

        /*$dbcCar->autocommit(false);
        $dbcStickers->autocommit(false);
        $dbcServices->autocommit(false);*/

        $carSuccess = $this->commitCarUpdate($dbcCar, $carModelObject);
        $stickerSuccess = $this->commitStickerUpdate($dbcStickers, $carModelObject);
        $servicesSuccess = $this->commitServiceUpdate($dbcServices, $carModelObject);

        if($carSuccess == 1 && $stickerSuccess == 1 && $servicesSuccess == 1){

          /*$dbcCar->commit();
          $dbcStickers->commit();
          $dbcServices->commit();*/
          return 1;
        }
        else{

          /*$dbcCar->rollback();
          $dbcStickers->rollback();
          $dbcServices->rollback();*/
          return 0;
        }
      }
      catch(Exception $e){

        return 0;
      }
    }

    private function commitCarUpdate($dbc, $carModelObject){

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

        $wClause = " WHERE Spz = '{$spz}'";
        $queryCar = "UPDATE car SET Brand = '{$brand}', Type = '{$type}', Seats = {$seats}, State = '{$state}', ".
                    "Emission_check = '{$emissionCheck}', Stk = '{$stk}', Mandatory_insurance = '{$mandatoryInsurance}', ".
                    "Accident_insurance = '{$accidentInsurance}', Mealige = {$mealige}, Relative_mealige = {$relativeMealige}".
                    $wClause;

        $dbc->query($queryCar);

        if($dbc->error)
         return 0;
       else
         return 1;
      }
      catch(Exception $e){

        return $e;
      }
    }

    private function commitStickerUpdate($dbc, $carModelObject){

      $spz = $dbc->real_escape_string(trim($carModelObject->getSpz()));
      $stickers = $carModelObject->getStickers();

      $wClause = " WHERE Spz = '{$spz}'";

      $this->deleteFromTable('car_sticker', $wClause);
      if(empty($stickers))
        return true;

      $insertRowAffected = 0;
      foreach ($stickers as $sticker) {

        $insertRowAffected += $this->insertSticker($spz, $sticker);
      }

      if($insertRowAffected == sizeof($stickers));
        return true;

      return false;
    }

    private function commitServiceUpdate($dbc, $carModelObject){

      $spz = $dbc->real_escape_string(trim($carModelObject->getSpz()));
      $services = $carModelObject->getServices();

      $wClause = " WHERE Spz = '{$spz}'";

      $this->deleteFromTable('car_service', $wClause);
      if(empty($services))
        return true;

      $insertRowAffected = 0;
      foreach ($services as $service) {

        $insertRowAffected += $this->insertService($spz, $service);
      }

      if($insertRowAffected == sizeof($services));
        return true;

      return false;
    }

    private function deleteFromTable($table, $wClause){

      try{

        $dbc = DatabaseConnection::openConnection();

        $query = "DELETE FROM ".$table.$wClause;
        $dbc->query($query);
        return $dbc->affected_rows;
      }
      catch(Exception $e){

        return false;
      }
    }

    private function insertSticker($spz, $sticker){

      try{

        $dbc = DatabaseConnection::openConnection();

        $country = $dbc->real_escape_string(trim($sticker['country']));
        $expirationDate = $dbc->real_escape_string(trim($sticker['expirationDate']));

        $query = "INSERT INTO car_sticker (Spz, Country, Expiration_date)" .
                 " VALUES ('{$spz}', '{$country}', '{$expirationDate}')";

        $dbc->query($query);
        return $dbc->affected_rows;
      }
      catch(Exception $e){

        return false;
      }
    }

    private function insertService($spz, $service){

      try{

        $dbc = DatabaseConnection::openConnection();

        $issue = $dbc->real_escape_string(trim($service['issue']));
        $mealige = $dbc->real_escape_string(trim($service['mealige']));
        $repareDate = $dbc->real_escape_string(trim($service['repareDate']));

        $query = "INSERT INTO car_service (Spz, Issue, Repare_date, Mealige)" .
                 " VALUES ('{$spz}', '{$issue}', '{$repareDate}', '{$mealige}')";

        $dbc->query($query);
        return $dbc->affected_rows;
      }
      catch(Exception $e){

        return false;
      }
    }
  }

?>
