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
