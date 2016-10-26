function LoadOrders(){

  var data = {id: '', email:'', dateFrom:'', dateTo:''};
  var url = GetOrdersUrl();
  ajaxCall(LoadOrdersResponse, "POST", url, 'json', data);
}

function LoadOrdersResponse(response){

  console.log("Response to the ajax request - Get orders");
  console.log(response);

  if(response != null){
    GenerateTableBody(response);
  }
}

function DeleteResponse(response){

  console.log("Response to the ajax request - Delete order");
  console.log(response);

  GenerateTable();
}
