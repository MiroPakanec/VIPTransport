<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/userModel.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/orderModel.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Model/companyModel.php';

  class ValidationController{

    public function validateUser($userModelObject){

      $errorCounter = 0;

      if(null !== $userModelObject->getEmail())
        $errorCounter += $this->validateEmail($userModelObject->getEmail());
      if(null !== $userModelObject->getFname())
        $errorCounter += $this->validateInput($userModelObject->getFname(), '^[a-zA-Z]+$^', 50, 3, false);
      if(null !== $userModelObject->getMname())
        $errorCounter += $this->validateInput($userModelObject->getMname(), '^[a-zA-Z]+$^', 50, 1, true);
      if(null !== $userModelObject->getLname())
        $errorCounter += $this->validateInput($userModelObject->getLname(), '^[a-zA-Z]+$^', 50, 3, false);
      if(null !== $userModelObject->getPassword())
        $errorCounter += $this->validateInput($userModelObject->getPassword(), '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$^', 50, 8, false);
      if(null !== $userModelObject->getPhone())
        $errorCounter += $this->validateInput($userModelObject->getPhone(), '^[0-9+]*$^', 20, 5, false);

      return $errorCounter;
    }

    public function validateOrder($orderModelObject){

      $errorCounter = 0;

      $errorCounter += $this->validateSessionEmail($orderModelObject->getEmail());
      if(null !== $orderModelObject->getEmail())
        $errorCounter += $this->validateEmail($orderModelObject->getEmail());
      if(null !== $orderModelObject->getFrom())
        $errorCounter += $this->validateInput($orderModelObject->getFrom(), '^[a-zA-Z0-9 ]+$^', 50, 3, false);
      if(null !== $orderModelObject->getTo())
        $errorCounter += $this->validateInput($orderModelObject->getTo(), '^[a-zA-Z0-9 ]+$^', 50, 3, false);
      if(null !== $orderModelObject->getPasangers())
        $errorCounter += $this->validateIntegerInput($orderModelObject->getPasangers(), 9, 1, false);
      if(null !== $orderModelObject->getPayment())
        $errorCounter += $this->validateInput($orderModelObject->getPayment(), '^[a-zA-Z ]+$^', 50, 3, false);
      if(null !== $orderModelObject->getPhone())
        $errorCounter += $this->validateInput($orderModelObject->getPhone(), '^[0-9]+$^', 20, 3, false);
      if(null !== $orderModelObject->getNames())
        $errorCounter += $this->validateNames($orderModelObject->getNames());

      /*if(null !== $orderModelObject->getNames())
        $errorCounter += $this->validateNames($orderModelObject->getNames(), $orderModelObject->getPasangers());*/

      return $errorCounter;
    }

    public function validateOrderState($orderState, $sessionType){

      $errorCounter = 0;

      if($orderState != 'Stand by' && $sessionType != 'manager')
        $errorCounter += 1;

      return $errorCounter;
    }

    public function validateOrderSearch($id, $email, $dateFrom, $dateTo){

      $errorCounter = 0;

      if(strlen($id) > 0)
        $errorCounter += $this->validateIntegerInput($id, 10000, 1, false);
      if(strlen($email) > 0)
        $errorCounter += $this->validateEmail($email);
      if(strlen($dateFrom) > 0)
        $errorCounter += $this->validateDateString($dateFrom);
      if(strlen($dateTo) > 0)
        $errorCounter += $this->validateDateString($dateTo);

      return $errorCounter;
    }

    public function validateSessionEmail($email){

      $errorCounter = 0;

      $errorCounter += $this->validateEmail($email);
      if($_SESSION['type'] != 'manager' && $_SESSION['email'] != $email)
        $errorCounter ++;

      return $errorCounter;
    }

    private function validateNames($namesArray){

      $errorCounter = 0;

      $arrayCount = array_count_values($namesArray);
      //check duplicates
      foreach ($arrayCount as $key => $value) {
        if($value > 1)
          $errorCounter++;
      }

      foreach ($namesArray as $element) {
        $errorCounter += $this->validateInput($element, '^[a-zA-Z ]+$^', 50, 3, false);
      }

      return $errorCounter;
    }

    public function validateLogin($email, $password){

      $errorCounter = 0;

      $errorCounter += $this->validateEmail($email);
      $errorCounter += $this->validateInput($password, '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$^', 50, 8, false);

      return $errorCounter;
    }

    public function validatePassword($currentPassword, $newPassword, $newPasswordRepeat, $storedPassword){

      $errorCounter = 0;

      $errorCounter += $this->validateInput($currentPassword, '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$^', 50, 8, false);
      $errorCounter += $this->validateInput($newPassword, '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$^', 50, 8, false);
      $errorCounter += $this->validateInput($newPasswordRepeat, '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$^', 50, 8, false);

      if(!$this->validateCorrectPassword($currentPassword, $storedPassword))
        $errorCounter++;

      if(!$this->validatePasswordMatch($newPassword, $newPasswordRepeat))
        $errorCounter++;

      return $errorCounter;
    }

    public function validateDate($year, $month, $day, $hour, $minute, $second, $clock){


      if($year > date('Y')+1 || $year < date('Y'))
        return 1;
      else if(!checkdate($month, $day, $year))
        return 1;
      else if($hour > 12 || $hour < 0)
        return 1;
      else if($minute > 60 || $minute < 0)
        return 1;
      else if($second > 60 || $second < 0)
        return 1;
      else if($clock != 'AM' && $clock != 'PM')
        return 1;

      return 0;
    }

    private function validateInput($value, $regex, $maxChars, $minChars, $skip){

      if(empty($value)){
        if($skip)
          return 0;

        return 1;
      }
      else if(strlen($value) > $maxChars)
        return 1;
      else if(strlen($value) < $minChars)
        return 1;
      else if(!preg_match($regex, $value))
        return 1;

      return 0;
    }

    private function validateIntegerInput($value, $maxValue, $minValue, $skip){

      $regex = '/^[1-9][0-9]{0,4}$/';
      if(empty($value)){
        if($skip)
          return 0;

        return 1;
      }
      else if($value > $maxValue)
        return 1;
      else if($value < $minValue)
        return 1;
      else if(!preg_match($regex, $value))
        return 1;

      return 0;
    }

    private function validateDateString($date)
    {
        $d = DateTime::createFromFormat('Y-m-d', $date);
        if($d && $d->format('Y-m-d') === $date)
          return 0;

        return 1;
    }

    private function validateEmail($email){

      if(!filter_var($email, FILTER_VALIDATE_EMAIL))
        return 1;

      return 0;
    }

    private function validateCorrectPassword($password, $storedPassword){

      if(!password_verify($password, $storedPassword))
        return 0;
      else
        return 1;
    }

    private function validatePasswordMatch($password, $passwordRepeat){

      if($password != $passwordRepeat)
        return 0;
      else
        return 1;
    }
  }

?>
