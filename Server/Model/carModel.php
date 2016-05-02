<?php

class CarModel{

    private $spz;
    private $brand;
    private $type;
    private $seats;
    private $state;
    private $emissionCheck;
    private $stk;
    private $mandatoryInsurance;
    private $accidentInsurance;
    private $mealige;
    private $relativeMealige;
    private $services;
    private $stickers;

    public function __construct($spz, $brand, $type, $seats, $state, $emissionCheck, $stk, $mandatoryInsurance, $accidentInsurance, $mealige, $relativeMealige, $services, $stickers){

      $this->spz = $spz;
      $this->brand = $brand;
      $this->type = $type;
      $this->seats = $seats;
      $this->state = $state;
      $this->emissionCheck = $emissionCheck;
      $this->stk = $stk;
      $this->mandatoryInsurance = $mandatoryInsurance;
      $this->accidentInsurance = $accidentInsurance;
      $this->mealige = $mealige;
      $this->relativeMealige = $relativeMealige;
      $this->services = $services;
      $this->stickers = $stickers;
    }

    public function getSpz(){
      return $this->spz;
    }

    public function getBrand(){
      return $this->brand;
    }

    public function getType(){
      return $this->type;
    }

    public function getSeats(){
      return $this->seats;
    }

    public function getState(){
      return $this->state;
    }

    public function getEmissionCheck(){
      return $this->emissionCheck;
    }

    public function getStk(){
      return $this->stk;
    }

    public function getMandatoryInsurance(){
      return $this->mandatoryInsurance;
    }

    public function getAccidentInsurance(){
      return $this->accidentInsurance;
    }

    public function getMealige(){
      return $this->mealige;
    }

    public function getRelativeMealige(){
      return $this->relativeMealige;
    }

    public function getServices(){
      return $this->services;
    }

    public function getStickers(){
      return $this->stickers;
    }

    public function setSpz($value){
      $this->spz = $value;
    }

    public function setBrand($value){
      $this->brand = $value;
    }

    public function setType($value){
      $this->type = $value;
    }

    public function setSeats($value){
      $this->seats = $value;
    }

    public function setState($value){
      $this->state = $value;
    }

    public function setEmissionCheck($value){
      $this->emissionCheck = $value;
    }

    public function setStk($value){
      $this->stk = $value;
    }

    public function setMandatoryInsurance($value){
      $this->mandatoryInsurance = $value;
    }

    public function setAccidentInsurance($value){
      $this->accidentInsurance = $value;
    }

    public function setMealige($value){
      $this->mealige = $value;
    }

    public function setRelativeMealige($value){
      $this->relativeMealige = $value;
    }

    public function setServices($value){
      $this->services = $value;
    }

    public function setStickers($value){
      $this->stickers = $value;
    }

}

?>
