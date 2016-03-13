<?php

  //return current username to the client
  if(isset($_SESSION["username"]))
    echo 'in';
  else
    echo 'out';
?>
