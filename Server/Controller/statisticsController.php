<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/validationController.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/statisticsFindDatabaseAccess.php';

class StatisticsController{

    public function getStatistics($group, $type, $query){

      if($this->startSession() == 0)
        return 0;

      if($this->validateStatistics($group, $type, $query) > 0)
        return 0;

      return $this->getMapReduceResult($group, $type, $query);
      //return $getStatisticsDatabaseAccessObject->getStatistics($mapReduce);
    }

    private function startSession(){

      $sessionControllerObject = new SessionController();
      if(!$sessionControllerObject->sessionStarted())
        $sessionControllerObject->startSession();

      if($this->checkTransportSession() == 1)
        return 1;

      return 0;
    }

    private function checkTransportSession(){

      if($_SESSION['type'] == 'manager')
        return 1;

      return 0;
    }

    private function validateStatistics($group, $type, $query){

      $validationControllerObject =  new ValidationController();
      return $validationControllerObject->validateStatistics($group, $type, $query);
    }

    private function getMapReduceResult($group, $type, $query){

      switch ($group) {
        case 'income':
          return $this->getIncomeMapReduce($type, $query);
          break;

        default:
          # code...
          break;
      }
    }

    private function getIncomeMapReduce($type, $query){

      switch ($type) {
        case 'car':
          $mapReduceQuery = $this->getIncomeCarQuery($query);
          $mapReduce =  $this->getMapReduceCode('route.car', 'price', $mapReduceQuery);
          return $this->getMapReduceResultIncomeCar($mapReduce);
          break;

        default:
          # code...
          break;
      }
    }

    private function getMapReduceCode($type, $group, $query){

      $mapReduce = array();
      $mapReduce['mapreduce'] = "transports";
      $mapReduce['map'] = "function(){ emit( this.".$type.", this.".$group.")}";
      $mapReduce['reduce'] = "function(key, values){ return Array.sum( values)}";
      $mapReduce['query'] = $query;
      $mapReduce['out'] = array("merge" => "eventCounts");
      return $mapReduce;
    }

    private function getIncomeCarQuery($query){



      $timeStampFrom = strtotime($query['dateFrom']) * 1000;
      $timeStampTo = strtotime($query['dateTo']) * 1000;

      $mpQuery = array(
        "type" => "official",
        "arrivalDateDestination" => ['$gte' => new MongoDB\BSON\UTCDateTime($timeStampFrom),
                                     '$lt' => new MongoDB\BSON\UTCDateTime($timeStampTo)]
      );

      return $mpQuery;
    }

    private function getMapReduceResultIncomeCar($mapReduce){

      $statisticsFindDatabaseAccessObject = new StatisticsFindDatabaseAccess();
      $result = $statisticsFindDatabaseAccessObject->getStatistics($mapReduce);
      return $this->getIncomeCarOutputString($result);
    }

    private function getIncomeCarOutputString($result){

      if(empty($result))
        return 0;

      $outputString = '';

      foreach ($result as $document) {

        $outputString .= 'SPZ : ' . $document['_id'] . 'break' . 'Revenue : ' . $document['value'] . 'break break';
      }

      return $outputString;
    }
  }

?>
