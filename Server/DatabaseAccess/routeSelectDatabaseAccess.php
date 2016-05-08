<?php

  include_once('databaseConnection.php');
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/routeModel.php';

  class RouteSelectDatabaseAccess{

    public function getRoutes($wClause){

      try{

        $id = $oId = $date = $transporterEmail = $carSpz = $countries = '';

        $dbc = DatabaseConnection::openConnection();
        $query = "SELECT transport_route.Id, transport_route.Order_id, transport_order.DateTime, ".
                 "transport_route.Transporter_email, transport_route.Car_spz ".
                 "FROM transport_route INNER JOIN transport_order ".
                 "ON transport_route.Order_id = transport_order.Id ".$wClause;

        $response = @mysqli_query($dbc, $query);
        $array = array();

        if($response){
            while($row = mysqli_fetch_array($response)){

              $id = $row['Id'];
              $oId = $row['Order_id'];
              $date = $row['DateTime'];
              $transporterEmail = $row['Transporter_email'];
              $carSpz = $row['Car_spz'];
              $countriesArray = $this->getCountries($id);

              $arrayRoute =  array($id, $oId, $date, $transporterEmail, $carSpz, $countriesArray);
              array_push($array, $arrayRoute);
            }
        }

        mysqli_close($dbc);
        return $array;
      }
      catch(Exception $e){

        return array();
      }
    }

    public function getCountries($id){

      $array = array();
      $dbc = DatabaseConnection::openConnection();
      $queryService = "SELECT * FROM transport_route_country_code WHERE Route_id = ".$id;
      $responseService = @mysqli_query($dbc, $queryService);

      if($responseService){

        while($row = mysqli_fetch_array($responseService)){

          $countryCode = $row['Country_code'];
          array_push($array, $countryCode);
        }
      }

      return $array;
    }
  }
