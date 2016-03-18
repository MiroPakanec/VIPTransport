<?php

class UserModel{

    private $username;
    private $fname;
    private $mname;
    private $lname;
    private $password;
    private $email;
    private $phone;

    public function __construct($email, $fname, $mname, $lname, $password, $phone){

      $this->email = $email;
      $this->fname = $fname;
      $this->mname = $mname;
      $this->lname = $lname;
      $this->password = $password;
      $this->phone = $phone;
    }

    public function getFname(){
      return $this->fname;
    }

    public function getMname(){
      return $this->mname;
    }

    public function getLname(){
      return $this->lname;
    }

    public function getPassword(){
      return $this->password;
    }

    public function getEmail(){
      return $this->email;
    }

    public function getPhone(){
      return $this->phone;
    }

    public function setFname($value){
      $this->fname = $value;
    }

    public function setMname($value){
      $this->mname = $value;
    }

    public function setLname($value){
      $this->lname = $value;
    }

    public function setEmail($value){
      $this->email = $value;
    }

    public function setPhone($value){
      $this->phone = $value;
    }
  }

?>
