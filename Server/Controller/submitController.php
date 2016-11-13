<?php
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/routeSubmitDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/DatabaseAccess/transportCustomDatabaseAccess.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/sessionController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/validationController.php';

  class SubmitController{

    public function SubmitRoute($orderId, $routeId, $email, $dateString, $from, $to, $price, $duration, $distance, $car){

      $this->startSession();
      if($_SESSION['type'] != 'manager' && $_SESSION['type'] != 'transporter')
        return 0;

      $routeSubmitDatabaseAccessObject = new RouteSubmitDatabaseAccess();
      return $routeSubmitDatabaseAccessObject->Submit($orderId, $routeId, $email, $dateString, $from, $to, $price, $duration, $distance, $car);
    }

    public function SelectTransports(){
      $this->startSession();

      $transportCustomSelectDatabaseAccess = new TransportCustomDatabaseAccess();
      return $transportCustomSelectDatabaseAccess->GetTransports($this->WithWClause());
    }

    private function WithWClause(){

      if($_SESSION['type'] == 'manager'){
        return ' WHERE 1';
      }
      else{
        return " WHERE Email = '".$_SESSION['email']."'";
      }
    }

    private function startSession(){

      $sessionControllerObject = new SessionController();
      if(!$sessionControllerObject->sessionStarted())
        $sessionControllerObject->startSession();
    }
  }
?>
