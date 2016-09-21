<?php

function Redirect($url, $permanent = false)
{
  header('Location: ' . $url, true, $permanent ? 301 : 302);

  exit();
}

//Redirect('/VIPTransport/View/Pages/MainPage.html', false);
Redirect('/VIPTransport/NewView/Pages/mainPage.html', false);
?>
