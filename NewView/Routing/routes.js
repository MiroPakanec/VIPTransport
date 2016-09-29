function GetRoutesUrl(){
  return GetRootUrl() + "NewView/Routing/routes.json";
}

function loadRoutes(){

  var root = GetRootUrl();
  var routesUrl = GetRoutesUrl();

  $.getJSON( routesUrl, function( json ) {
    $('.route').each(function(){
      var tag = $(this).attr('resource');
      var route = GetJsonObject(json, tag);
      var url = root + route;
      $(this).attr('href', url);
    });
  });
}
