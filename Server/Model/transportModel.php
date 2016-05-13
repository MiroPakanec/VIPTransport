<?php

class TransportModel{

    private $price;
    private $mealige;
    private $distance;
    private $arrivalDatePickUp;
    private $arrivalDateDestination;
    private $duration;
    private $type;
    private $route;
    private $order;
    private $employee;
    private $company;

    public function __construct($price, $mealige, $distance, $arrivalDatePickUp, $arrivalDateDestination, $duration, $type, $route, $order, $employee, $company){

      $this->price = $price;
      $this->mealige = $mealige;
      $this->distance = $distance;
      $this->arrivalDatePickUp = $arrivalDatePickUp;
      $this->arrivalDateDestination = $arrivalDateDestination;
      $this->duration = $duration;
      $this->type = $type;
      $this->route = $route;
      $this->order = $order;
      $this->employee = $employee;
      $this->company = $company;
    }

    public function getPrice(){
      return $this->price;
    }

    public function getMealige(){
      return $this->mealige;
    }

    public function getDistance(){
      return $this->distance;
    }

    public function getArrivalDatePickUp(){
      return $this->arrivalDatePickUp;
    }

    public function getArrivalDateDestination(){
      return $this->arrivalDateDestination;
    }

    public function getDuration(){
      return $this->duration;
    }

    public function getType(){
      return $this->type;
    }

    public function getRoute(){
      return $this->route;
    }

    public function getOrder(){
      return $this->order;
    }

    public function getEmployee(){
      return $this->employee;
    }

    public function getCompany(){
      return $this->company;
    }

    public function setPrice($value){
      $this->price = $value;
    }

    public function setMealige($value){
      $this->mealige = $value;
    }

    public function setDistance($value){
      $this->distance = $value;
    }

    public function setArrivalDatePickUp($value){
      $this->arrivalDatePickUp = $value;
    }

    public function setArrivalDateDestination($value){
      $this->arrivalDateDestination = $value;
    }

    public function setDuration($value){
      $this->duration = $value;
    }

    public function setType($value){
      $this->type = $value;
    }

    public function setRoute($value){
      $this->route = $value;
    }

    public function setOrder($value){
      $this->order = $value;
    }

    public function setEmployee($value){
      $this->employee = $value;
    }

    public function setCompany($value){
      $this->company = $value;
    }
}

?>
