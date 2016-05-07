<?php

class RouteModel{

    private $id;
    private $orderId;
    private $transporterEmail;
    private $carSpz;
    private $message;

    public function __construct($id, $orderId, $transporterEmail, $carSpz, $message){

      $this->id = $id;
      $this->orderId = $orderId;
      $this->transporterEmail = $transporterEmail;
      $this->carSpz = $carSpz;
      $this->message = $message;
    }

    public function getId(){
      return $this->id;
    }

    public function getOrderId(){
      return $this->orderId;
    }

    public function getTransporterEmail(){
      return $this->transporterEmail;
    }

    public function getCarSpz(){
      return $this->carSpz;
    }

    public function getMessage(){
      return $this->message;
    }

    public function setId($value){
      $this->id = $value;
    }

    public function setOrderId($value){
      $this->orderId = $value;
    }

    public function setTransporterEmail($value){
      $this->transporterEmail = $value;
    }

    public function setCarSpz($value){
      $this->carSpz = $value;
    }

    public function setMessage($value){
      $this->message = $value;
    }
  }

  ?>
