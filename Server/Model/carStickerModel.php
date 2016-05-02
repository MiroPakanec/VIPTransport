<?php

class CarStickerModel{

    private $spz;
    private $country;
    private $expirationDate;

    public function __construct($spz, $country, $expirationDate){

      $this->spz = $spz;
      $this->country = $country;
      $this->expirationDate = $expirationDate;
    }

    public function getSpz(){
      return $this->spz;
    }

    public function getCountry(){
      return $this->country;
    }

    public function getExpirationDate(){
      return $this->expirationDate;
    }

    public function setSpz($value){
      $this->spz = $value;
    }

    public function setCountry($value){
      $this->country = $value;
    }

    public function setExpirationDate($value){
      $this->expirationDate = $value;
    }
  }

?>
