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
      if(null !== $userModelObject->getType())
        $errorCounter += $this->validateInput($userModelObject->getType(), '^[a-zA-Z]+$^', 20, 5, false);

      return $errorCounter;
    }

    public function validateCompany($companyModelObject){

      $errorCounter = 0;

      if(null !== $companyModelObject->getEmail())
        $errorCounter += $this->validateEmail($companyModelObject->getEmail());
      if(null !== $companyModelObject->getName())
        $errorCounter += $this->validateInput($companyModelObject->getName(), '^[a-zA-Z]+$^', 50, 3, false);
      if(null !== $companyModelObject->getAddress())
        $errorCounter += $this->validateInput($companyModelObject->getAddress(), '^[a-zA-Z0-9-. ]+$^', 50, 1, true);
      if(null !== $companyModelObject->getIco())
        $errorCounter += $this->validateInput($companyModelObject->getIco(), '^[0-9]+$^', 8, 8, false);
      if(null !== $companyModelObject->getDic())
        $errorCounter += $this->validateInput($companyModelObject->getDic(), '^[0-9]+$^', 10, 10, false);

      return $errorCounter;
    }

    public function validateRoute($routeModelObject){

      $errorCounter = 0;

      if(null !== $routeModelObject->getId())
        $errorCounter += $this->validateIntegerInput($routeModelObject->getId(), 1000000, 1, false);
      if(null !== $routeModelObject->getOrderId())
        $errorCounter += $this->validateIntegerInput($routeModelObject->getOrderId(), 1000000, 1, false);
      if(null !== $routeModelObject->getTransporterEmail())
        $errorCounter += $this->validateEmail($routeModelObject->getTransporterEmail());
      if(null !== $routeModelObject->getCarSpz());
        $errorCounter += $this->validateInput($routeModelObject->getCarSpz(), '^[a-zA-Z0-9]+$^', 8, 8, false);
      if(null !== $routeModelObject->getCountries()){

        foreach ($routeModelObject->getCountries() as $country) {

          $errorCounter += $this->validateInput($country, '^[A-Z]+$^', 2, 1, false);
        }
      }

      return $errorCounter;
    }

    public function validateTransport($transportModelObject){

      $errorCounter = 0;

      if(null !== $transportModelObject->getPrice())
        $errorCounter += $this->validateDecimalInput($transportModelObject->getPrice(), 10000, 5, false);
      if(null !== $transportModelObject->getMealige())
        $errorCounter += $this->validateDecimalInput($transportModelObject->getMealige(), 100000000, 4, false);
      if(null !== $transportModelObject->getArrivalDate())
        $errorCounter += $this->validateDateString($transportModelObject->getArrivalDate()->format('d/m/Y h:i:s'), 'd/m/Y h:i:s');
      if(null !== $transportModelObject->getType());
        $errorCounter += $this->validateInput($transportModelObject->getType(), '^[a-zA-Z]+$^', 15, 5, false);

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

    public function validateCar($carModelObject){

      $errorCounter = 0;

      //if(!empty($carModelObject->getSpz()))
        $errorCounter += $this->validateInput($carModelObject->getSpz(), '^[a-zA-Z0-9]+$^', 8, 8, false);
      //if(!empty($carModelObject->getBrand()))
        $errorCounter += $this->validateInput($carModelObject->getBrand(), '^[a-z]+$^', 50, 3, false);
      //if(!empty($carModelObject->getType()))
        $errorCounter += $this->validateInput($carModelObject->getType(), '^[a-zA-Z0-9-]+$^', 50, 3, false);
      //if(!empty($carModelObject->getSeats()))
        $errorCounter += $this->validateIntegerInput($carModelObject->getSeats(), 50, 2, false);
      if(!empty($carModelObject->getEmissionCheck()))
        $errorCounter += $this->validateDateString($carModelObject->getEmissionCheck(), 'Y-m-d');
      if(!empty($carModelObject->getStk()))
        $errorCounter += $this->validateDateString($carModelObject->getStk(), 'Y-m-d');
      if(!empty($carModelObject->getMandatoryInsurance()))
        $errorCounter += $this->validateDateString($carModelObject->getMandatoryInsurance(), 'Y-m-d');
      if(!empty($carModelObject->getAccidentInsurance()))
        $errorCounter += $this->validateDateString($carModelObject->getAccidentInsurance(), 'Y-m-d');
      if(!empty($carModelObject->getMealige()))
        $errorCounter += $this->validateDecimalInput($carModelObject->getMealige(), 1000000, 0, false);
      if(!empty($carModelObject->getRelativeMealige()))
        $errorCounter += $this->validateDecimalInput($carModelObject->getRelativeMealige(), 1000000, 0, false);

      if(!empty($carModelObject->getStickers()))
        foreach ($carModelObject->getStickers() as $sticker) {

          $errorCounter += $this->validateSticker($sticker);
        }

      if(!empty($carModelObject->getServices()))
        foreach ($carModelObject->getServices() as $service) {

          $errorCounter += $this->validateService($service);
        }

      return $errorCounter;
    }

    public function validateOrderSubmitInput($orderId, $transporterEmail, $carSpz, $countryCodes){

      $errorCounter = 0;

      $errorCounter += $this->validateIntegerInput($orderId, 1000000, 1, false);
      $errorCounter += $this->validateEmail($transporterEmail);
      $errorCounter += $this->validateInput($carSpz, '^[a-zA-Z0-9]+$^', 8, 8, false);

      if(empty($countryCodes))
        return $errorCounter;

      foreach ($countryCodes as $code) {

        $errorCounter += $this->validateInput($code, '^[A-Z]+$^', 2, 1, false);
      }

      return $errorCounter;
    }

    public function validateSearch($email, $fname, $lname, $type){

      $errorCounter = 0;

      $errorCounter += $this->validateInput($email, '^[a-zA-Z0-9@.-_]+$^', 50, 0, true);
      $errorCounter += $this->validateInput($fname, '^[a-zA-Z]+$^', 50, 0, true);
      $errorCounter += $this->validateInput($lname, '^[a-zA-Z]+$^', 50, 0, true);
      $errorCounter += $this->validateInput($type, '^[a-zA-Z]+$^', 50, 0, true);

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

      $errorCounter += $this->validateIntegerInput($id, 10000, 1, true);
      $errorCounter += $this->validateInput($email, '^[a-zA-Z0-9@.-_]+$^', 50, 0, true);

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

    private function validateDecimalInput($value, $maxValue, $minValue, $skip){

      $regex = '/^(\d+\.?\d{0,9}|\.\d{1,9})$/';
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

    private function validateDateString($date, $format)
    {
        $d = DateTime::createFromFormat($format, $date);
        if($d && $d->format($format) === $date)
          return 0;

        return 1;
    }

    private function validateEmail($email){

      if(!filter_var($email, FILTER_VALIDATE_EMAIL))
        return 1;

      return 0;
    }

    private function validateSticker($sticker){

      $errorCounter = 0;

      $errorCounter += $this->validateInput($sticker['country'], '^[A-Z]+$^', 2, 1, false);
      $errorCounter += $this->validateDateString($sticker['expirationDate'], 'Y-m-d');

      return $errorCounter;
    }

    private function validateService($service){

      $errorCounter = 0;

      $errorCounter += $this->validateInput($service['issue'], '^[A-Za-z0-9]+$^', 50, 3, false);
      $errorCounter += $this->validateDecimalInput($service['mealige'], 1000000, 0, false);
      $errorCounter += $this->validateDateString($service['repareDate'], 'Y-m-d');

      return $errorCounter;
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
