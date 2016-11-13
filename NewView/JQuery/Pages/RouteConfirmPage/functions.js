function LoadData(){

  var oid = GetParamFromUrl('oid');
  var rid = GetParamFromUrl('rid');

  LoadUser();
  LoadOrder(oid);
  LoadRoute(oid);
  LoadCustomerWithOrder(oid);
}

function FillData(data, form){

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      console.log(key + " -> " + data[key]);
      //console.log($('input[name='+key+']'));

      $(form).find('input[name='+key+']').val(data[key]);
    }
  }
}

function CalculateDuration(){

  var dateString1 = $('input[name=date1]').val();
  var dateString2 = $('input[name=date2]').val();
  var timeString1 = $('input[name=time1]').val();
  var timeString2 = $('input[name=time2]').val();

  if(dateString1.length <= 0 || dateString2.length <= 0 || timeString1.length <= 0 || timeString2.length <= 0){
    return;
  }

  var datetimeString1 = dateString1 +' '+ timeString1;
  var datetimeString2 = dateString2 +' '+ timeString2;

  var datetime1 = new Date(datetimeString1);
  var datetime2 = new Date(datetimeString2);

  if(datetime2.getTime() < datetime1.getTime()){
    ClearDates();
    return;
  }

  var timeDiff = Math.abs(datetime2.getTime() - datetime1.getTime());
  var diffMinutes = Math.ceil(timeDiff / (1000 * 60));

  var duration = HourMinutesCOnverter(diffMinutes);
  $('input[name=duration]').val(duration);
}

function CalculateDistance(car){

  var mealigeBefore = car.Mealige;
  var mealigeTarget = $('input[name=tmealige]');
  var mealigeAfter = $(mealigeTarget).val();

  var distance = mealigeAfter - mealigeBefore;

  if(Number.isInteger(distance) == false || distance <= 0){
    $(mealigeTarget).val('');
    ShowRedOutline(mealigeTarget);
    return;
  }

  $('input[name=distance]').val(distance);
}

function HourMinutesCOnverter(minutes){

  var hours = 0;

  while(minutes >= 60){

    minutes-= 60;
    hours++;
  }

  hours = RepareTime(hours);
  minutes = RepareTime(minutes);

  return hours + ":" + minutes;
}

function ClearDates(){
  $('input[name=date1]').val('');
  $('input[name=date2]').val('');
  $('input[name=time1]').val('');
  $('input[name=time2]').val('');
}

function ValidateSubmit(){

  var formOrder = $('.form-info-order');
  var formRoute = $('.form-info-route');
  var formCustomer = $('.form-info-customer');
  var formCompany = $('.form-info-company');
  var formTransport = $('.form-info-transportation');

  ValidateForm(formOrder);
  ValidateForm(formRoute);
  ValidateForm(formCustomer);
  ValidateForm(formCompany);
  ValidateForm(formTransport);

  if(IsFormCorrect(formOrder) == false ||
     IsFormCorrect(formRoute) == false ||
     IsFormCorrect(formCustomer) == false ||
     IsFormCorrect(formCompany) == false ||
     IsFormCorrect(formTransport) == false){

    return false;
  }

  return true;
}

function GetSubmitRouteData(){

  var orderId = $('.form-info-order').find('input[name=id]').val();
  var date = $('.form-info-order').find('input[name=date]').val();
  var from = $('.form-info-order').find('input[name=from]').val();
  var to = $('.form-info-order').find('input[name=to]').val();

  var price = $('.form-info-transportation').find('input[name=price]').val();
  var duration = $('.form-info-transportation').find('input[name=duration]').val();
  var distance = $('.form-info-transportation').find('input[name=distance]').val();

  var car = $('.form-info-route').find('input[name=4]').val();
  var routeId = $('.form-info-route').find('input[name=0]').val();

  var email = $('.form-info-customer').find('input[name=email]').val();;

  var data = {};

  data.orderId = orderId;
  data.routeId = routeId;
  data.email = email;
  data.date = date;
  data.from = from;
  data.to = to;
  data.price = price;
  data.duration = duration;
  data.distance = distance;
  data.car = car;

  return data;
}
