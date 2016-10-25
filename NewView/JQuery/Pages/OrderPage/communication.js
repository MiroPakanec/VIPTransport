function LoadOrder(){

  var id = GetIdFromUrl();
  if(id == null){
    return;
  }

  var data = {id: id, email:'', dateFrom:'', dateTo:''};
  var url = GetOrdersUrl();
  ajaxCall(LoadOrderResponse, "POST", url, 'json', data);

  $(document).ajaxComplete(function( event, xhr, settings ) {
    if ( settings.url === GetOrdersUrl() ) {
      LoadNames();
    }
  });
}

function LoadNames(){

  var id = GetIdFromUrl();
  if(id == null){
    return;
  }

  var data = {id: id};
  var url = GetNamesUrl();
  ajaxCall(LoadNamesResponse, "POST", url, 'json', data);
}

function LoadOrderResponse(response){

  console.log("Response to the ajax request - Load order resources.");
  console.log(response);

  var order = response[0];
  var date = GetDateString(GetDateFromPHP(order.date));
  var time = GetTimeString(GetDateFromPHP(order.date));

  $('#email').val(order.email);
  $('#date').val(date);
  $('#time').val(time);
  $('#from').val(order.from);
  $('#to').val(order.to);

  //STRING MUST BE EXACT - THERE ARE INCONSISTENT DATA IN DB
  $('#type').val(order.payment);
  $('#numberOfPasangersSelector').val(order.pasangers).trigger('change');
  $('#phone').val(order.phone);
}

function LoadNamesResponse(response){

  console.log("Response to the ajax request - Load name resources.");
  console.log(response);

  $('#numberOfPasangersTarget').find('.form-control').each(function(e){
    $(this).val(response[e]);
  });
}

function GetIdFromUrl(){
  var url = window.location.href;
  var urlParams = URLToArray(url);
  var id = urlParams["id"];
  return id;
}
