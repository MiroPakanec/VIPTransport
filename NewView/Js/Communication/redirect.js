function RedirectHome(){
  var href = $('#gohome').attr('href');

  if(href == null){
    throw "This page URL is incorrect";
    return;
  }
  else{
    window.location = href;
  }
}

function RedirectMain(){
  var href = $('#gomain').attr('href');

  if(href == null){
    throw "This page URL is incorrect";
    return;
  }
  else{
    window.location = href;
  }
}

function RedirectMyOrders(){
  var href = $('#gomyorders').attr('href');

  if(href == null){
    throw "This page URL is incorrect";
    return;
  }
  else{
    window.location = href;
  }
}

function RedirectHistory(){
  var href = $('#gohistory').attr('href');

  if(href == null){
    throw "This page URL is incorrect";
    return;
  }
  else{
    window.location = href;
  }
}
