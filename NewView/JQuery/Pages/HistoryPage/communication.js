function LoadOrders(){

  var data = {id: '', email:'', dateFrom:'', dateTo:''};
  var url = GetOrdersUrl();
  ajaxCall(LoadOrdersResponse, "POST", url, 'json', data);
}

function LoadTransports(){
  var url = GetTransportsUrl();
  ajaxCall(LoadTransportsResponse, "POST", url, 'json', '');
}

function LoadOrdersResponse(response){

  console.log("Response to the ajax request - Get orders");
  console.log(response);

  if(response != null){
    GenerateTableBody(response);
  }
}

function LoadTransportsResponse(response){

  console.log("Response to the ajax request - Get transports");
  console.log(response);

  if(response != null){
    GenerateTableBody(response);
  }
}
