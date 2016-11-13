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
          '<li class="dropdown dynamic-dropdown">' +
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Transports<span class="caret"></span></a>' +
            '<ul class="dropdown-menu">' +
              '<li><a class="route" resource="myorders">Orders</a></li>' +
              '<li><a class="route" resource="mytransports">Scheduled transports</a></li>' +
              '<li><a class="route" resource="history">History</a></li>' +
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

function GenerateManagerDropdown(){

  var html =
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Manager<span class="caret"></span></a>' +
            '<ul class="dropdown-menu">' +
              '<li><a class="route" resource="myorders">Orders</a></li>' +
              '<li><a class="route" resource="mytransports">Scheduled transports</a></li>' +
              '<li><a class="route" resource="history">History</a></li>' +
              '<li role="separator" class="divider"></li>' +
              '<li><a class="route" resource="order-confirm">Planner</a></li>' +
              '<li><a class="route" resource="routes">Routes</a></li>' +
              '<li role="separator" class="divider"></li>' +
              '<li><a class="route" resource="users">Users</a></li>' +
              '<li><a class="route" resource="cars">Cars</a></li>' +
            '</ul>';

  return html;
}

function GenerateEmployeeDropdown(){
  throw "Not implemented exception";
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

function GenerateElementOption(option, element){

  var html='<option>'+option+'</option>';
  $(element).append(html);
}

function GenerateSticker(countryCode, dateString){

  var html =
  '<div class="row row-sticker row-buffer-top border border-standard row-margin-top row-dark">' +
    '<div class="form-group">' +
      '<div class="col-xs-3 col-xs-offset-1">' +
        '<span class="text-standard text-center">Country code</span>' +
      '</div>' +
      '<div class="col-xs-7 col-xs-offset-0 col-buffer-bottom">' +
        '<input type="text" class="form-control form-mandatory" name="country" value="'+countryCode+'">' +
        '<input type="hidden" class="regex" value="/^/" regex="/^[A-Z]{1,3}$/">' +
        '<span class="help-block error-message text-left invisible">Please use only capital lettern, <strong>e.g. SK</strong>, with max. of 3 characters.</span>' +
      '</div>' +
    '</div>' +
    '<div class="form-group">' +
      '<div class="col-xs-3 col-xs-offset-1">' +
        '<span class="text-standard text-center">Expiration date</span>' +
      '</div>' +
      '<div class="col-xs-7 col-xs-offset-0">' +
        '<div class="input-group date form_date" data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">' +
          '<input class="form-control form-blur-skip form-mandatory" size="16" type="text" value="'+dateString+'" readonly name="expirationDate">' +
          '<!--<span class="input-group-addon"><span class="glyphicon glyphicon-small glyphicon-remove"></span></span>-->' +
          '<span class="input-group-addon"><span class="glyphicon glyphicon-small glyphicon-calendar" title="Open calendar"></span></span>' +
          '<input type="hidden" class="regex" value="/^/" regex="/^/">' +
        '</div>' +
        '<input type="hidden" id="dtp_input2" value="" /><br/>' +
      '</div>' +
    '</div>' +
    '<div class="form-group">' +
      '<div class="col-xs-3 col-xs-offset-8 col-buffer-small-bottom">' +
        '<button class="btn btn-block btn-standard btn-block text-standard btn-remove-sticker text-center text-small" type="button" title="Remove sticker">' +
          '<span class="glyphicon glyphicon-extrasmall glyphicon-minus"></span>' +
        '</button>' +
      '</div>' +
    '</div>' +
  '</div>';

  $('.stickers-section').append(html);
}

function GenerateService(issue, mealige, dateString){

  var issueRegex = /^[A-Za-z0-9-_.,\s]{1,30}$/;

  var html =
  '<div class="row row-service row-buffer-top border border-standard row-margin-top row-light">' +
    '<div class="form-group">' +
      '<div class="col-xs-3 col-xs-offset-1">' +
        '<span class="text-standard text-center">Issue</span>' +
      '</div>' +
      '<div class="col-xs-7 col-xs-offset-0 col-buffer-bottom">' +
        '<input type="text" class="form-control form-mandatory" name="issue" value="'+issue+'">' +
        '<input type="hidden" class="regex" value="/^/" regex="'+issueRegex+'">' +
        '<span class="help-block error-message text-left invisible">Please use text, <strong>e.g. Issue example - small desc. </strong>, with max. of 30 characters.</span>' +
      '</div>' +
    '</div>' +
    '<div class="form-group">' +
      '<div class="col-xs-3 col-xs-offset-1">' +
        '<span class="text-standard text-center">Service date</span>' +
      '</div>' +
      '<div class="col-xs-7 col-xs-offset-0">' +
        '<div class="input-group date form_date" data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">' +
          '<input class="form-control form-blur-skip form-mandatory" size="16" type="text" value="'+dateString+'" readonly name="repareDate">' +
          '<span class="input-group-addon"><span class="glyphicon glyphicon-small glyphicon-calendar" title="Open calendar"></span></span>' +
          '<input type="hidden" class="regex" value="/^/" regex="/^/">' +
        '</div>' +
        '<input type="hidden" id="dtp_input2" value="" /><br/>' +
      '</div>' +
    '</div>' +
    '<div class="form-group">' +
      '<div class="col-xs-3 col-xs-offset-1">' +
        '<span class="text-standard text-center">Mealige</span>' +
      '</div>' +
      '<div class="col-xs-7 col-xs-offset-0">' +
        '<input type="text" class="form-control form-mandatory" name="mealige" value="'+mealige+'">' +
        '<input type="hidden" class="regex" value="/^/" regex="/^[0-9]{1,6}$/">' +
        '<span class="help-block error-message text-left invisible">Please use only whole numbers <strong>e.g. 1000</strong>, with max. amount 1 000 000 (km).</span>' +
      '</div>' +
    '</div>' +
    '<div class="form-group">' +
      '<div class="col-xs-3 col-xs-offset-8 col-buffer-small-bottom">' +
        '<button class="btn btn-block btn-standard btn-block text-standard btn-remove-service text-center text-small" type="button" title="Remove sticker">' +
          '<span class="glyphicon glyphicon-extrasmall glyphicon-minus"></span>' +
        '</button>' +
      '</div>' +
    '</div>' +
  '</div>';

  $('.services-section').append(html);
}

function GenerateElementCountryOption(name, code, element){
  var html =
  '<div class="row">' +
    '<div class="col-xs-12">' +
      '<button class="btn btn-block btn-standard btn-countrycode btn-block text-standard text-center text-extrasmall" countryCode="'+code+'" type="button">'+name+'</button>' +
    '</div>' +
  '</div>';

  $(element).append(html);
}
