function LoadRoutes(orderId){

  var url = GetRoutesUrl();
  ajaxCall(LoadRoutesResponse, "GET", url, 'json', '');
}

function LoadRoutesResponse(response){

  console.log("Response to the ajax request - Get routes");
  console.log(response);

  if(response != null){
    GenerateTableBody(response);
  }
}

function DeleteResponse(response){

  console.log("Response to the ajax request - Delete route");
  console.log(response);

  GenerateTable();
}
