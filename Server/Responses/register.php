<?php

  if(isset($_POST['firstName'], $_POST['middleName'], $_POST['lastName'],
  $_POST['username'], $_POST['password'], $_POST['email'], $_POST['phone'])){

    $username = $_POST['username'];
    if($username == 'Miroslav'){
      echo 'I see you Miroslav';
    }
    else{
      echo 'get out of here bitch';
    }
  }

?>
