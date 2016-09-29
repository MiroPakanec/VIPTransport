function DevicePixelRatio(){
  return window.devicePixelRatio;
}

/* LOCATE ELEMENTS */
function GetFormWithButton(submitButton){

  return $(submitButton).parent().parent().parent();
}

/* LOCATE ELEMENT ID */
function GetElementId(element){
  var idText = $(element).attr('id');
  var id = '#' + idText;

  if(id == null){
    console.log("Requested element does not have ID specified.");
  }
  return id;
}

function GetElementValue(element){
  if(IsOfTypeInput(element)){
    return $(element).val();
  }
  else if(IsOfTypeDiv(element)){
    return $(element).html();
  }
  else{
    console.log("Requested element with ID: " + $(element).attr('id') + ", is neither of type INPUT nor DIV.");
    return null;
  }
}

function SetElementValue(element, value){
  if(IsOfTypeInput(element)){
    $(element).val(value);
  }
  else if(IsOfTypeDiv(element)){
    $(element).html(value);
  }
  else{
    console.log("Requested set of element with ID: " + $(element).attr('id') + ", is not possible, because element is neither of type INPUT nor DIV.");
  }
}

function IsOfTypeInput(element){
  if($(element).is("input")){
    return true;
  }
  else{
    return false;
  }

  function IsOfTypeDiv(element){
    if($(element).is("div")){
      return true;
    }
    else{
      return false;
    }
  }
}

function IsEmpty(element){
  if($(element).val().length <= 0 && $(element).html().length <= 0){
    return true;
  }
  return false;
}

function HasAttr(element, attr){
  if($(element).attr(attr) == null){
    return false;
  }
  else{
    return true;
  }
}

function GetFormWithButton(submitButton){

  return $(submitButton).parent().parent().parent();
}

function RemoveSpaces(element){
  var value = GetElementValue(element).trim();
  SetElementValue(element, value);
  return element;
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

function GetRootUrl(){
  var url = window.location.href.toLowerCase();
  var indexName = "viptransport";
  var index = url.indexOf(indexName);
  var result = url.substring(0, index + indexName.length + 1);
  return result;
}

/* JSON */
function GetJsonObject(obj, key){
  var objects = GetObjects(obj, key);
  return objects[0][key];
}

function GetObjects(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(GetObjects(obj[i], key));
        } else if (i == key) {
            objects.push(obj);
        }
    }
    return objects;
}
