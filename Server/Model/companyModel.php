<?php

class CompanyModel{

    private $email;
    private $name;
    private $address;
    private $ico;
    private $dic;

    public function __construct($email, $name, $address, $ico, $dic){

      $this->email = $email;
      $this->name = $name;
      $this->address = $address;
      $this->ico = $ico;
      $this->dic = $dic;
    }

    public function getEmail(){
      return $this->email;
    }

    public function getName(){
      return $this->name;
    }

    public function getAddress(){
      return $this->address;
    }

    public function getIco(){
      return $this->ico;
    }

    public function getDic(){
      return $this->dic;
    }

    public function setName($value){
      $this->name = $value;
    }

    public function setAddress($value){
      $this->address = $value;
    }

    public function setIco($value){
      $this->ico = $value;
    }

    public function setDic($value){
      $this->dic = $value;
    }
  }

?>
