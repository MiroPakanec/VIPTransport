function GenerateFooter(){
  var html =
  '<div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">' +
    '<div class="row">' +
      '<p class="text-muted text-highlight text-left">&copy; 2016 VIPTransport.com</p>' +
    '</div>' +
    '<div class="row">' +
      '<p class="text-muted text-highlight text-left">Developed by <strong>Miroslav Pakanec</strong> - miropakanec@gmail.com</p>' +
    '</div>' +
  '</div>';

  $('.footer-section').html(html);
}

function GenerateNavbar(){

  var html =
  '<nav class="navbar navbar-default navbar-fixed-top border-standard border-bottom text-small text-standard container-light">' +
    '<div class="container">' +
      '<div class="navbar-header">' +
        '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">' +
          '<span class="sr-only">Toggle navigation</span>' +
          '<span class="icon-bar"></span>' +
          '<span class="icon-bar"></span>' +
          '<span class="icon-bar"></span>' +
        '</button>' +
      '</div>' +
      '<div id="navbar" class="navbar-collapse collapse">' +
        '<ul class="nav nav-justified">' +
          '<li><a class="route" resource="home">Home</a></li>' +
          '<li><a class="route" resource="order">New Order</a></li>' +
          '<li><a class="route" resource="transports">My transports</a></li>' +
          '<li><a class="route" resource="about">About us</a></li>' +
          '<li><a class="route" resource="logout">Log out</a></li>' +
        '</ul>' +
      '</div><!--/.nav-collapse -->' +
    '</div>'+
  '</nav>';

  $('.navbar-section').html(html);
}
