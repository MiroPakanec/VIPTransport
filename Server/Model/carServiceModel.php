<?php

class CarServiceModel{

    private $id;
    private $spz;
    private $issue;
    private $repareDate;
    private $mealige;

    public function __construct($id, $spz, $issue, $repareDate, $mealige){

      $this->id = $id;
      $this->spz = $spz;
      $this->issue = $issue;
      $this->repareDate = $repareDate;
      $this->mealige = $mealige;
    }

    public function getId(){
      return $this->id;
    }

    public function getSpz(){
      return $this->spz;
    }

    public function getIssue(){
      return $this->issue;
    }

    public function getRepareDate(){
      return $this->repareDate;
    }

    public function getMealige(){
      return $this->mealige;
    }

    public function setId($value){
      $this->id = $value;
    }

    public function setSpz($value){
      $this->spz = $value;
    }

    public function setIssue($value){
      $this->issue = $value;
    }

    public function setRepareDate($value){
      $this->repareDate = $value;
    }

    public function setMealige($value){
      $this->mealige = $value;
    }
  }

  ?>
