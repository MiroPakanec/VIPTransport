function FillFormWithCar(response){

  var car = response.car1;

  $("[name='spz']").val(car.Spz);
  $("[name='brand']").val(car.Brand);
  $("[name='type']").val(car.Type);
  $("[name='seats']").val(car.Seats);

  if(car.State == 'ready'){
    $("[name='state']").val('Ready');
  }
  else{
    $("[name='state']").val('Offhand');
  }

  var emissionCheck = new Date(car.EmissionCheck);
  var emissionCheckDate = GetDateString(emissionCheck);
  $("[name='emissionCheck']").val(emissionCheckDate);

  var stk = new Date(car.Stk);
  var stkDate = GetDateString(stk);
  $("[name='stk']").val(stkDate);

  var mandatoryInsurance = new Date(car.MandatoryInsurance);
  var mandatoryInsuranceDate = GetDateString(mandatoryInsurance);
  $("[name='mandatoryInsurance']").val(mandatoryInsuranceDate);

  var accidentInsurance = new Date(car.AccidentInsurance);
  var accidentInsuranceDate = GetDateString(accidentInsurance);
  $("[name='accidentInsurance']").val(accidentInsuranceDate);

  $("[name='mealige']").val(car.Mealige);
}

function GenerateCarOptios(response){

  $('.car-options').html('');
  for (index in response){

    GenerateElementCarOption(response[index].Spz);
  }
}

function GenerateStickers(response){

  var car = response.car1;

  if(car.Stickers == null || car.Stickers.length <= 0){
    return;
  }

  for (index in car.Stickers){

    var countryCode = car.Stickers[index].Country;

    var date = new Date(car.Stickers[index].ExpirationDate);
    var dateString = GetDateString(date);

    GenerateSticker(countryCode, dateString);
  }
}

function GenerateServices(response){

  var car = response.car1;

  if(car.Services == null || car.Services.length <= 0){
    return;
  }

  for (index in car.Services){

    var issue = car.Services[index].Issue;
    var mealige = car.Services[index].Mealige;

    var date = new Date(car.Services[index].RepareDate);
    var dateString = GetDateString(date);

    GenerateService(issue, mealige, dateString);
  }
}

function ClearForms(){

  ResetStickersAndServices();

  ClearForm($('#form-car'));
  ClearForm($('#form-stickers'));
  ClearForm($('#form-services'));
}

function ResetStickersAndServices(){
  $('.stickers-section').html('');
  $('.services-section').html('');

  stickers = 0;
  services = 0;
}

function GetStickerFormData(){

  var data = {};
  $('#form-stickers').find('.row-sticker').each(function(index){
    var key = "sticker" + index;
    var stickerData = {}

    $(this).find('.form-control').each(function(){
      var key = GetElementKey($(this));
      var value = GetElementValue($(this));
      stickerData[key] = value;
    });

    stickerData = ManageData(stickerData);
    data[key] = stickerData;
  });

  return data;
}

function GetServiceFormData(){

  var data = {};

  $('#form-services').find('.row-service').each(function(index){
    var key = "service" + index;
    var serviceData = {}

    $(this).find('.form-control').each(function(){
      var key = GetElementKey($(this));
      var value = GetElementValue($(this));
      serviceData[key] = value;
    });

    serviceData = ManageData(serviceData);
    data[key] = serviceData;
  });

  return data;
}

function ManageData(data){

  $.each( data, function( key, value ) {
    if(VerifyKeyForDate(key) == false){
      return;
    }
    else{
      var dateString = data[key];
      var date = new Date(dateString);

      var day = VerifyDateDigit(date.getDate());
      var month = VerifyDateDigit(date.getMonth() +1);
      var year = VerifyDateDigit(date.getFullYear());

      data[key] = year + '-' + month + '-' + day;
    }
});

return data;
}

function VerifyDateDigit(amount){

  if(amount < 10){
    amount = '0' + amount;
  }

  return amount;
}

function VerifyKeyForDate(key){

  if(key == 'emissionCheck'){
    return true;
  }
  if(key == 'stk'){
    return true;
  }
  if(key == 'emissionCheck'){
    return true;
  }
  if(key == 'mandatoryInsurance'){
    return true;
  }
  if(key == 'accidentInsurance'){
    return true;
  }
  if(key == 'expirationDate'){
    return true;
  }
  if(key == 'repareDate'){
    return true;
  }

  return false;
}
