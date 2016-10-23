function ajaxCall(responseMethod, type, url, dataType, data){

  $.ajax({
      type: type,
      url: url,
      dataType : dataType,
      data: data,
      success: function(successResponse){
          responseMethod(successResponse);
      },
      error: function(errorResponse){
          responseMethod(errorResponse);
      }
  });
}

function ResponseMethod(response){

  console.log("Response to the ajax request:");
  //console.log(response);
}
