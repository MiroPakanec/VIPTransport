var root = GetRootUrl();

$(function(){

  LoadRoutesJson();
});

function LoadRoutesJson(){

  var type = 'GET';
  var url = GetAjaxRoutesUrl();
  var datatype = 'json';
  var data = null;

  ajaxCall(function(response){

    if(response == null){
      return;
    }

    var jsonString = response;
    var routeJsonObj = ParseRoutesJson(jsonString);

    LoadHrefs(routeJsonObj);
    LoadImages(routeJsonObj);

  }, type, url, datatype, data);
}

function LoadHrefs(routeJsonObj){

  $('.route').each(function(){
    var tag = $(this).attr('resource');
    var route = GetJsonObject(routeJsonObj, tag);
    var url = root + route;
    $(this).attr('href', url);
  });
}

function LoadImages(routeJsonObj){

  $('.route-img').each(function(){
    var tag = $(this).attr('resource-img');
    var route = GetJsonObject(routeJsonObj, tag);
    $(this).attr('src', route);
  });
}

function ParseRoutesJson(jsonString){
    return JSON.parse(jsonString);
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
    return "http://viptransporttest.byethost18.com/VIPTransport/";
  }
}
