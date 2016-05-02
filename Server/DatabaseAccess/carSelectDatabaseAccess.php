<?php

  include_once('databaseConnection.php');
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/carModel.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/carServiceModel.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/carStickerModel.php';

  class CarSelectDatabaseAccess{

    public function getCars($wClause){

      try{

        $spz = $brand = $type = $seats = $state = $emissionCheck = $stk =
        $mandatoryInsurance = $accidentInsurance = $mealige = $relativeMealige = '';

        $dbc = DatabaseConnection::openConnection();
        $query = "SELECT * FROM car " . $wClause;

        $response = @mysqli_query($dbc, $query);
        $array = array();

        if($response){
            while($row = mysqli_fetch_array($response)){

              $spz = $row['Spz'];
              $brand = $row['Brand'];
              $type = $row['Type'];
              $seats = $row['Seats'];
              $state = $row['State'];
              $emissionCheck = $row['Emission_check'];
              $stk = $row['Stk'];
              $mandatoryInsurance = $row['Mandatory_insurance'];
              $accidentInsurance = $row['Accident_insurance'];
              $mealige = $row['Mealige'];
              $relativeMealige = $row['Relative_mealige'];
              $serviceArray = $this->getCarServices($spz);
              $stickerArray = $this->getCarStickers($spz);

              $carModelObject = new CarModel($spz, $brand, $type, $seats, $state, $emissionCheck, $stk, $mandatoryInsurance, $accidentInsurance, $mealige, $relativeMealige, $serviceArray, $stickerArray);
              array_push($array, $carModelObject);
            }
        }

        mysqli_close($dbc);
        return $array;
      }
      catch(Exception $e){

        return array();
      }
    }

    private function getCarServices($spz){

      $array = array();
      $dbc = DatabaseConnection::openConnection();
      $queryService = "SELECT * FROM car_service WHERE Spz = '".$spz."'";
      $responseService = @mysqli_query($dbc, $queryService);

      if($responseService){

        while($row = mysqli_fetch_array($responseService)){

          $id = $row['Id'];
          $issue = $row['Issue'];
          $repareDate = $row['Repare_date'];
          $mealige = $row['Mealige'];

          $carServiceModelObject = new CarServiceModel($id, $spz, $issue, $repareDate, $mealige);
          array_push($array, $carServiceModelObject);
        }
      }

      return $array;
    }

    private function getCarStickers($spz){

      $array = array();
      $dbc = DatabaseConnection::openConnection();
      $queryStickers = "SELECT * FROM car_sticker WHERE Spz = '".$spz."'";
      $responseStickers = @mysqli_query($dbc, $queryStickers);

      if($responseStickers){

        while($row = mysqli_fetch_array($responseStickers)){

          $country = $row['Country'];
          $expirationDate = $row['Expiration_date'];

          $carStickerModelObject = new CarStickerModel($spz, $country, $expirationDate);
          array_push($array, $carStickerModelObject);
        }
      }

      return $array;
    }
  }

?>
