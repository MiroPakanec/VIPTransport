<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Server/Controller/userController.php';

  //echo out to check posted file
  /*
  echo "<pre>";
  print_r($_FILES);
  echo "</pre>";
  */

  $file = $_FILES['file']['tmp_name'];

  if(!isset($file))
    echo 'Please select a file';
  else{
    $image = addslashes(file_get_contents($_FILES['file']['tmp_name']));
    $imageName = addslashes($_FILES['file']['name']);

    //validation variables
    $isImage = getimagesize($_FILES['file']['tmp_name']);
    $imageSize = fileSize($_FILES['file']['tmp_name']);

    //validate image format and size
    $imageValidation = validateImage($isImage, $imageSize);
    if(strlen($imageValidation) > 0)
      echo $imageValidation;
    else{

      $userControllerObject = new UserController();
      $response = $userControllerObject->updateImage($image);
      echo $response;
    }
  }

  function validateImage($isImage, $imageSize){

    if($isImage == false)
      return 'Please enter an image';
    else if(($imageSize/1024/1024) > 1)
      return 'Please enter smaller image (max 1 MB)';

    return '';
  }
 ?>
