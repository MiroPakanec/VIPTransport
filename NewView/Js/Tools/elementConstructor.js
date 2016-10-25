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
          '<li class="dropdown">' +
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Transports<span class="caret"></span></a>' +
            '<ul class="dropdown-menu">' +
              '<li><a class="route" resource="myorders">Orders</a></li>' +
              '<li><a class="route" resource="mytransports">Scheduled transports</a></li>' +
              '<li><a class="route" resource="history">History</a></li>' +
              '<li role="separator" class="divider"></li>' +
              '<li class="dropdown-header">Management section</li>' +
              '<li><a href="#">Action1</a></li>' +
              '<li><a href="#">Action2</a></li>' +
            '</ul>' +
          '</li>' +
          '<li><a class="route" resource="account">My account</a></li>' +
          '<li><a class="route" resource="about">About us</a></li>' +
          '<li><a class="route" resource="logout">Log out</a></li>' +
        '</ul>' +
      '</div><!--/.nav-collapse -->' +
    '</div>'+
  '</nav>';

  $('.navbar-section').html(html);
}

function GenerateFormGroup(targetId, type, placeholder, regex, errorMessage){
  var html =
    '<div class="form-group">' +
    '<div class="col-sm-12">' +
      '<' + type + ' type="text" class="form-control form-mandatory" placeholder="'+placeholder+'">' +
      '<input type="hidden" class="regex" value="/^/" regex="'+regex+'">' +
      '<span class="help-block error-message text-left invisible">' + errorMessage + '</span> ' +
    '</div>' +
  '</div>';

  $('#' + targetId).append(html);
}

function GenerateModal(targetId, title, text){

  var html =
  '<div class="modal fade" id="myModal" role="dialog">' +
    '<div class="modal-dialog">' +
      '<div class="modal-content">' +
        '<div class="modal-header">' +
          '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
          '<h4 class="modal-title">'+title+'</h4>' +
        '</div>' +
        '<div class="modal-body">' +
          '<p>'+text+'</p>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';

  $('#' + targetId).html(html);
}
