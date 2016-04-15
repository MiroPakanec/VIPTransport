<?php

  class OrderModel{

    private $id;
    private $email;
    private $date;
    private $from;
    private $to;
    private $pasangers;
    private $payment;
    private $phone;
    private $names; //array
    private $creationDate;
    private $status;

    public function __construct($id, $email, $date, $from, $to, $pasangers, $payment, $phone, $names, $creationDate, $status){

      $this->id = $id;
      $this->date = $date;
      $this->email = $email;
      $this->from = $from;
      $this->to = $to;
      $this->pasangers = $pasangers;
      $this->payment = $payment;
      $this->phone = $phone;
      $this->names = $names;
      $this->creationDate =$creationDate;
      $this->status = $status;
    }

    public function getId(){
      return $this->id;
    }

    public function getDate(){
      return $this->date;
    }

    public function getEmail(){
      return $this->email;
    }

    public function getFrom(){
      return $this->from;
    }

    public function getTo(){
      return $this->to;
    }

    public function getPasangers(){
      return $this->pasangers;
    }

    public function getPayment(){
      return $this->payment;
    }

    public function getPhone(){
      return $this->phone;
    }

    public function getNames(){
      return $this->names;
    }

    public function getCreationDate(){
      return $this->creationDate;
    }

    public function getStatus(){
      return $this->status;
    }

    public function setId($value){
      $this->id = $value;
    }

    public function setDate($value){
      $this->date = $value;
    }

    public function setFrom($value){
      $this->from = $value;
    }

    public function setTo($value){
      $this->to = $value;
    }

    public function setPasangers($value){
      $this->pasangers = $value;
    }

    public function setPayment($value){
      $this->pasangers = $value;
    }

    public function setPhone($value){
      $this->pasangers = $value;
    }

    public function setNames($value){
      $this->names = $value;
    }

    public function setCreationDate($value){
      $this->creationDate = $value;
    }

    public function setStatus($value){
      $this->status = $value;
    }
  }
?>
