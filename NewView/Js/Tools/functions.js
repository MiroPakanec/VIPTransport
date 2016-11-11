function DevicePixelRatio(){
  return window.devicePixelRatio;
}

/* LOCATE ELEMENTS */
function GetFormWithButton(submitButton){

  return $(submitButton).parent().parent().parent();
}

function ResetForm(form){

  $(form).find('.form-control').each(function(){

    console.log($(this));
    HideOutline($(this));
    HideErrors($(this));
  })
}

function FindClosestParentWithClass(element, className){
  var parent = $(element).closest("." + className);
  return parent;
}

function FillFormData(form, object){

  $(form).find('[name]').each(function(){

    var name = $(this).attr('name');
    $(this).val(object[name]);
  });
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
  if(IsOfTypeInput(element) || IsOfTypeSelect(element)){
    return $(element).val();
  }
  else if(IsOfTypeDiv(element) || IsOfTypeTextArea(element)){
    return $(element).html();
  }
  else{
    console.log("Requested element with ID: " + $(element).attr('id') + ", is neither of type INPUT nor DIV.");
    return null;
  }
}

function SetElementValue(element, value){
  if(IsOfTypeInput(element) || IsOfTypeSelect(element)){
    $(element).val(value);
  }
  else if(IsOfTypeDiv(element) || IsOfTypeTextArea(element)){
    $(element).html(value);
  }
  else{
    console.log("Requested set of element with ID: " + $(element).attr('id') + ", is not possible, because element is neither of type INPUT nor DIV.");
  }
}

function ClearElementValue(element){
  if($(element).hasClass('permanent')){
    return;
  }

  if(IsOfTypeInput(element) || IsOfTypeSelect(element)){
    $(element).val('');
  }
  else if(IsOfTypeDiv(element)){
    $(element).html('');
  }
  else{
    console.log("Requested clear of element with ID: " + $(element).attr('id') + ", is not possible, because element is neither of type INPUT nor DIV.");
  }
}

function GetElementDefaultValue(element){
  var defaultValue = $(element).attr('default');
  return defaultValue;
}

function SetElementDefaultValue(element){
  var defaultValue = GetElementDefaultValue(element);

  if(!HasDefault(element)){
    console.log(element + ' has no default value.');
    return;
  }

  SetElementValue(element, defaultValue);
}

function IsOfTypeInput(element){
  if($(element).is("input")){
    return true;
  }
  else{
    return false;
  }
}

function IsOfTypeDiv(element){
    if($(element).is("div")){
      return true;
    }
    else{
      return false;
    }
}

function IsOfTypeSelect(element){

  if($(element).is("select")){
    return true;
  }
  else{
    return false;
  }
}

function IsOfTypeTextArea(element){

  if($(element).is("textarea")){
    return true;
  }
  else{
    return false;
  }
}

function IsEmpty(element){
  if($(element).val().length <= 0 && $(element).html().length <= 0){
    return true;
  }
  return false;
}

function IsGenerated(element){
  if($(element).hasClass('generated')){
    return true;
  }
  else{
    return false;
  }
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

function SelectOption(element){

  var value = $(element).val();
  $(element).next().val(value);
}

function GetDayFromDate(dateString){

  var day = dateString.split("/")[0];
  return day;
}

function GetDayFromDateSpecified(dateString, splitter, index){

  var day = dateString.split(splitter)[index];
  return day;
}

function GetDateFromPHP(dateString){

  var day = dateString.split("/")[0];
  var month = dateString.split("/")[1];
  var year = dateString.split("/")[2].split(" ")[0];
  var hour = parseInt(dateString.split("/")[2].split(" ")[1].split(":")[0]);
  var minute = dateString.split("/")[2].split(" ")[1].split(":")[1];
  var second = dateString.split("/")[2].split(" ")[1].split(":")[2];
  var noon = dateString.split("/")[2].split(" ")[2];

  if(noon == "PM")
    hour += 12;

  return new Date(year + '-' + month + '-' + day + ' ' + hour + ":" + minute + ":" + second);
}

function GetTimeFromDatetimeObject(datetime){

  var minutes = RepareTime(datetime.getMinutes());
  var hours = RepareTime(datetime.getHours());

  return hours + ":" + minutes;
}

function GetDateString(date){

  var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();

var dateString = day + ' ' + monthNames[monthIndex] + ' ' + year;
return dateString;
}

function GetTimeString(date){

  var hours = date.getHours();
  var minutes = date.getMinutes();

  hours = RepareTimeZero(hours);
  minutes = RepareTimeZero(minutes);

  return hours + ':' + minutes;
}

function RepareTimeZero(string){

  if(string == "0"){
    return "00";
  }

  return string;
}

function RepareTime(time){

    if(time < 10){
      return "0"+time;
    }

    return time;
}

function GetFormData(form){

  var data = {};

  $(form).find('.form-control').each(function(){
    var key = GetElementKey($(this));
    var value = GetElementValue($(this));
    data[key] = value;
  });

  return data;
}

function GetElementKey(element){
  return $(element).attr('name');
}

function AlertObject(obj){
  str = JSON.stringify(obj);
  str = JSON.stringify(obj, null, 4);
  alert(str);
}

function RemoveActiveClass(customClass){
  $(customClass).each(function(){
    $(this).removeClass('active');
  });
}

function GeneratePassword(target){

  var password = "";
  var possibleChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var possibleDigit = "0123456789";

  for( var i=0; i < 5; i++ ){

    password += possibleChar.charAt(Math.floor(Math.random() * possibleChar.length));
    password += possibleDigit.charAt(Math.floor(Math.random() * possibleDigit.length));
  }

  $('#' + target).val(password);
  console.log(target);
}
