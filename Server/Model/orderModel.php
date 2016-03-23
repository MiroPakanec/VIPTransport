<?php

  class OrderModel{

    private $date;
    private $email;
    private $from;
    private $to;
    private $pasangers;
    private $payment;
    private $names; //array

    public function __construct($date, $email, $from, $to, $pasangers, $payment, $names){

      $this->date = $date;
      $this->email = $email;
      $this->from = $from;
      $this->to = $to;
      $this->pasangers = $pasangers;
      $this->payment = $payment;
      $this->names = $names;
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

    public function getNames(){
      return $this->names;
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

    public function setNames($value){
      $this->names = $value;
    }
  }
?>
