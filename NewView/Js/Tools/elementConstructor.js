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

  $('.footer').html(html);
}
