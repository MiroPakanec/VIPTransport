function ajaxCall(responseMethod, type, url, dataType, data){

  $.ajax({
      type: type,
      url: url,
      context: document.body,
      cache : false,
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

function GetDefaultDataType(){
  return 'Intelligent Guess (xml, json, script, or html)';
}

function ResponseMethod(response){

  console.log("Response to the ajax request:");
  console.log(response);
}
