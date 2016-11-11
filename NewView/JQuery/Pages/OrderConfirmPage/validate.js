function IsCarFree(data){

  var car = $('#options-car').val();

  var dateString = $('#order-datetime').val();
  var day = GetDayFromDate(dateString);

  for (index in data){

    var routeCar = data[index][4];
    var routeId = $('#route-id').val();
    var routeDateString = data[index][2];
    var routeDay = GetDayFromDateSpecified(routeDateString, '-', 2);
    //FIX
    routeDay = GetDayFromDateSpecified(routeDay, ' ', 0);

    if(car == routeCar && day == routeDay && routeId.length <= 0){
      return 0;
    }
  }

  return 1;
}

function IsCarCapable(data){

  if(data[index].State == 'Offhand'){
    return false;
  }
  /*check date*/
  var now = new Date();
  var emissionCheckDate = new Date(data[index].EmissionCheck);
  var stkDate = new Date(data[index].Stk);
  var mandatoryInsuranceDate = new Date(data[index].MandatoryInsurance);
  var accidentInsuranceDate = new Date(data[index].AccidentInsurance);

  if(emissionCheckDate < now){
    return false;
  }
  if(stkDate < now){
    return false;
  }
  if(mandatoryInsuranceDate < now){
    return false;
  }
  if(accidentInsuranceDate < now){
    return false;
  }
  return true;
}

function IsEmploeeFree(data){
  var employee = $('#options-employee').val();

  var dateString = $('#order-datetime').val();
  var day = GetDayFromDate(dateString);

  for (index in data){

    var routeEmployee = data[index][3];
    var routeId = $('#route-id').val();
    var routeDateString = data[index][2];
    var routeDay = GetDayFromDateSpecified(routeDateString, '-', 2);
    //FIX
    routeDay = GetDayFromDateSpecified(routeDay, ' ', 0);

    if(employee == routeEmployee && day == routeDay && routeId.length <= 0){
      return 0;
    }
  }

  return 1;
}

function IsCarFreeResponse(response, target){

  var control = FindClosestParentWithClass(target, 'form-group');

  if(response == 1){
    $(control).removeClass('has-warning');
    $(control).addClass('has-success');
    $(target).html('Selected car is free.');
  }
  else{
    $(control).removeClass('has-success');
    $(control).addClass('has-warning');
    $(target).html('Selected car already has scheduled transportation this day. Are you sure you want to use it?');
  }
}

function IsEmployeeFreeResponse(response, target){

  var control = FindClosestParentWithClass(target, 'form-group');

  if(response == 1){
    $(control).removeClass('has-warning');
    $(control).addClass('has-success');
    $(target).html('Selected employee is free.');
  }
  else{
    $(control).removeClass('has-success');
    $(control).addClass('has-warning');
    $(target).html('Selected employee already has scheduled transportation this day. Are you sure you want to use him/her?');
  }
}
