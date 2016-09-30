function GetRoutesUrl(){

  var root = GetRootUrl();
  var path = "newview/routing/routes.json";
  return root + path;
}

function LoadRoutes(){

  var root = GetRootUrl();
  var routesUrl = GetRoutesUrl();

  $.getJSON( routesUrl, function( json ) {
    $('.route').each(function(){
      var tag = $(this).attr('resource');
      var route = GetJsonObject(json, tag);
      var url = root + route;
      $(this).attr('href', url);
    });

    $('.route-img').each(function(){
      var tag = $(this).attr('resource-img');
      var route = GetJsonObject(json, tag);
      $(this).attr('src', route);
    });
  });
}

function GetUrlResource(tag){

  var routesUrl = GetRoutesUrl();
  var route;

  $.getJSON( routesUrl, function( json ) {
      route = GetJsonObject(json, tag);
      return route;
  });
}

function GetPageNameFromUrl(){
  var url = window.location.href.toLowerCase();
  var indexStart = url.lastIndexOf('/');
  var indexEnd = url.lastIndexOf('.html');
  var result = url.substring(indexStart + 1, indexEnd + 5);
  return result;
}

function GetServerFromUrl(){
  var url = window.location.href.toLowerCase();
  var index = url.indexOf('/');
  var result = url.substring(0, index);
  return result;
}

function GetRelativePathFromUrl(){
  var url = window.location.href.toLowerCase();
  var indexName = "viptransport";
  var indexName2 = ".html";
  var index = url.indexOf(indexName);
  var index2 = url.indexOf(indexName2);
  var result = url.substring(index + indexName.length + 1, index2 + indexName2.length + 1);
  return result;
}

function GetRootUrl(){
  if((window.location.hostname) == 'localhost'){
    return "http://localhost:8080/viptransport/";
  }
  else{
    return "http://viptransporttest.byethost18.com/viptransport/";
  }
}
