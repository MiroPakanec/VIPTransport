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
          $mapReduceQuery = $this->getIncomeQuery($query);
          $mapReduce =  $this->getMapReduceCode('route.car', 'price', $mapReduceQuery);
          return $this->getMapReduceResultIncome($mapReduce, 'SPZ');
          break;

        case 'transporter':
          $mapReduceQuery = $this->getIncomeQuery($query);
          $mapReduce =  $this->getMapReduceCode('route.transporter', 'price', $mapReduceQuery);
          return $this->getMapReduceResultIncome($mapReduce, 'EMAIL');
          break;

        case 'company':
          $mapReduceQuery = $this->getIncomeQuery($query);
          $mapReduce =  $this->getMapReduceCode('company.name', 'price', $mapReduceQuery);
          return $this->getMapReduceResultIncome($mapReduce, 'NAME');
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

    private function getIncomeQuery($query){



      $timeStampFrom = strtotime($query['dateFrom']) * 1000;
      $timeStampTo = strtotime($query['dateTo']) * 1000;

      $mpQuery = array(
        "type" => "official",
        "arrivalDateDestination" => ['$gte' => new MongoDB\BSON\UTCDateTime($timeStampFrom),
                                     '$lt' => new MongoDB\BSON\UTCDateTime($timeStampTo)]
      );

      if($query['payment'] != 'null' && $query['payment'] != 'All')
        $mpQuery["order.payment"] = $query['payment'];

      return $mpQuery;
    }

    private function getMapReduceResultIncome($mapReduce, $title){

      $statisticsFindDatabaseAccessObject = new StatisticsFindDatabaseAccess();
      $result = $statisticsFindDatabaseAccessObject->getStatistics($mapReduce);
      return $this->getIncomeCarOutputString($result, $title);
    }

    private function getIncomeCarOutputString($result, $title){

      if(empty($result))
        return 0;

      $outputString = '';

      foreach ($result as $document) {

        $outputString .= $title.' : ' . $document['_id'] . 'break' . 'Revenue : ' . $document['value'] . ' EUR' . 'break break';
      }

      return $outputString;
    }
  }

?>
