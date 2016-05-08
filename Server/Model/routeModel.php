<?php

class RouteModel{

    private $id;
    private $orderId;
    private $transporterEmail;
    private $carSpz;
    private $countries;

    public function __construct($id, $orderId, $transporterEmail, $carSpz, $countries){

      $this->id = $id;
      $this->orderId = $orderId;
      $this->transporterEmail = $transporterEmail;
      $this->carSpz = $carSpz;
      $this->countries = $countries;
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

    public function getCountries(){
      return $this->countries;
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

    public function setCountries($value){
      $this->countries = $value;
    }
  }

  ?>
