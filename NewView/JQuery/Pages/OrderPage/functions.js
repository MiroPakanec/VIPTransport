function GetFormNames(){

  var data = {};

  $('#numberOfPasangersTarget').find('.form-control').each(function(e){
    var value = GetElementValue($(this));
    data[e] = value;
  });

  return data;
}

function GetIdFromUrl(){
  var url = window.location.href;
  var urlParams = URLToArray(url);
  var id = urlParams["id"];
  return id;
}

function ManageOrderData(data){

  var id = GetIdFromUrl();
  if(id == null){
    data['Operation'] = 'create';
  }
  else{
    data['Id'] = id;
    data['Operation'] = 'update';
  }

  data['Names'] = GetFormNames();

  var dateString = data['Date'];
  var timeString = data['Time'] + ":00";
  var date = new Date(dateString +' '+ timeString);

  var day = VerifyDateDigit(date.getDate());
  var month = VerifyDateDigit(date.getMonth() +1);
  var year = VerifyDateDigit(date.getFullYear());

  var hours = VerifyDateDigit(date.getHours());
  var minutes = VerifyDateDigit(date.getMinutes());

  if(hours > 12){
    hours -= 12;
  }

  var clock = date.getHours() >= 12 ? 'PM' : 'AM';
  data['Date'] = day + '/' + month + '/' + year;
  data['TimeHour'] = hours;
  data['TimeMinute'] = minutes;
  data['Clock'] = clock;

  return data;
}

function VerifyDateDigit(amount){

  if(amount < 10){
    amount = '0' + amount;
  }

  return amount;
}
