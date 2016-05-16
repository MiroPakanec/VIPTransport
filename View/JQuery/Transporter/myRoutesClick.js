$(function(){

  $('#titleRoutes').click(function(){

    closeSubElementsOnLoad();
    closeDateArea();
    $('.orderSearchBarArea').slideUp(500);
    manageTitleCss('#titleRoutes', '#titleTransport', '#titleOrder', '0.05');
    generateTableRoutes();
    loadRoutes();
  });

  $(document).on('click', '#checkStickersButton', function(){

    var routeId = $('#detailsRouteId').html();
    var spz = $('#detailsCar').html();

    checkStickers(function(message){

      $('.detailsResponseArea').html(message).css({
        'background-color' : 'rgba(255,255,255,0.1)',
        'color' : 'white',
        'border' : '1px solid rgba(255,255,255,0.3)'
      }).slideDown(500);

      delaySlideUp('.detailsResponseArea', 20000);
    }, spz, routeId);
  });

  $(document).on('click', '.routeDetailsButton', function(){

    var orderId = $(this).parent().find($('input[name = "oid"]')).val();
    var routeId = $(this).parent().find($('input[name = "id"]')).val();

    hideRouteConfirm();
    hideConfirm();
    loadDetails(routeId, orderId);
  });

  $(document).on('click', '#cancelDetailsButton', function(){

    hideDetails();
  });

  $(document).on('click','.routeDeleteButton',function(){

    var orderId = $(this).parent().find($('input[name = "oid"]')).val();
    var routeId = $(this).parent().find($('input[name = "id"]')).val();
    //put id into the hidden field
    var alertText = generateDeleteAlertRoute(routeId, orderId);

    hideDetails();
    hideConfirm();
    hideRouteConfirm();
    $('#responseArea').html(alertText).css({
      'background-color' : 'rgba(255,255,255,0.1)',
      'color' : 'white',
      'border' : '1px solid rgba(255,255,255,0.3)'
    }).html(alertText).slideDown(500);
  });

  $(document).on('click', '.routeUpdateButton', function(){

    var element = $(this);

    hideRouteConfirm();
    $('#orderTableArea').css({'height' : '5%'});
    $('#responseArea').slideUp(300);
    $('.routeDetailsFormArea').fadeOut(300);
    $('.routeDetailsArea').slideUp(300);

    updateRoute(element);

    setTimeout(function(){
      $('.confirmArea').slideDown(500);
      $('.confirmFormArea').fadeIn(500);
    },200);
  });

  $(document).on('click', '.routeConfirmButton', function(){

    var orderId = $(this).parent().find($('input[name = "oid"]')).val();
    var routeId = $(this).parent().find($('input[name = "id"]')).val();
    hideRouteErrors();
    confirmRoute(routeId, orderId);
  });

  $(document).on('click', '#cancelRouteConfirmButton', function(){

    hideRouteConfirm();
  });

  $(document).on('click', '#proceedRouteConfirmButton', function(){

    if(validateRouteConfirm() == 0)
      repeatRouteConfirm();
  });

  $(document).on('click', '#backRouteConfirmRepeatButton', function(){

    $('.routeValidateFromArea').fadeOut(400);
    setTimeout(function(){
        $('.routeConfirmFormArea').fadeIn(500);
    },500);
  });

  $(document).on('click', '#cancelRouteConfirmRepeatButton', function(){

    clearRouteConfirm();
    hideRouteConfirm();
  });

  $(document).on('click', '#finishRouteConfirmButton', function(){

    insertTransport();
  });

  //blurs
  $('#routeConfirmPrice').on('keyup', function(){
    validateNumber('#routeConfirmPrice', '#routeConfirmPriceError', /^[0-9.]*$/, 'Incorrect number', 0, 10000, false);
  });

  $('#routeConfirmMealige').on('keyup', function(){
    validateNumber('#routeConfirmMealige', '#routeConfirmMealigeError', /^[0-9.]*$/, 'Incorrect number', 0, 1000000, false);
  });

  $('#routeConfirmTimeHour').on('keyup', function(){
    validateNumber('#routeConfirmTimeHour', '#routeConfirmTimeError', /^[0-9]*$/, 'Incorrect hour', 0, 24, false);
  });

  $('#routeConfirmTimeMinute').on('keyup', function(){
    validateNumber('#routeConfirmTimeMinute', '#routeConfirmTimeError', /^[0-9]*$/, 'Incorrect minute', 0, 59, false);
  });

  $('#routeConfirmDestinationTimeHour').on('keyup', function(){
    validateNumber('#routeConfirmDestinationTimeHour', '#routeConfirmDestinationTimeError', /^[0-9]*$/, 'Incorrect hour', 0, 24, false);
  });

  $('#routeConfirmDestinationTimeMinute').on('keyup', function(){
    validateNumber('#routeConfirmDestinationTimeMinute', '#routeConfirmDestinationTimeError', /^[0-9]*$/, 'Incorrect minute', 0, 59, false);
  });

  $("#datePickerRouteConfirm").datepicker({
          inline: true,
          showOtherMonths: true,
          dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          dateFormat: "yy-mm-dd",
          maxDate: '+6M',
          onSelect: function (date) {
                  $('#transportDate').html(date);
                  $('#datePickerRouteConfirm').slideToggle(500);
                  validateDateHtml('#transportDate', '#routeConfirmDateError', /^[0-9-]*$/, 'Incorrect date', false);
              }
  });

  $("#datePickerRouteConfirmDestination").datepicker({
          inline: true,
          showOtherMonths: true,
          dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          dateFormat: "yy-mm-dd",
          maxDate: '+6M',
          onSelect: function (date) {
                  $('#transportDestinationDate').html(date);
                  $('#datePickerRouteConfirmDestination').slideToggle(500);
                  validateDateHtml('#transportDestinationDate', '#routeConfirmDestinationDateError', /^[0-9-]*$/, 'Incorrect date', false);
              }
  });

  $('#transportDate').on('click', function(){
    $('#datePickerRouteConfirm').slideToggle(500);
  });

  $('#transportDestinationDate').on('click', function(){
    $('#datePickerRouteConfirmDestination').slideToggle(500);
  });

  $('#transportTypePersonal').on('click', function(){

    $(this).addClass('transportTypeHighlighted');
    $(this).prev().removeClass('transportTypeHighlighted');
    $('#transportTypeValue').val('personal')
  });

  $('#transportTypeOfficial').on('click', function(){

    $(this).addClass('transportTypeHighlighted');
    $(this).next().removeClass('transportTypeHighlighted');
    $('#transportTypeValue').val('official');
  });

  $('#transportTodayDate').on('click', function(){

    var today = getTodayDate();
    $('#transportDate').html(today);
    validateDateHtml('#transportDate', '#routeConfirmDateError', /^[0-9-]*$/, 'Incorrect date', false);
  });

  $('#transportDestinationTodayDate').on('click', function(){

    var today = getTodayDate();
    $('#transportDestinationDate').html(today);
    validateDateHtml('#transportDestinationDate', '#routeConfirmDestinationDateError', /^[0-9-]*$/, 'Incorrect date', false);
  });

  $('#transportTimeNow').on('click', function(){

    var date = new Date;
    var minutes = date.getMinutes();
    var hour = date.getHours();

    $('#routeConfirmTimeHour').val(hour);
    $('#routeConfirmTimeMinute').val(minutes);

    $('#routeConfirmTimeHour').trigger('keyup');
    $('#routeConfirmTimeMinute').trigger('keyup');
  });

  $('#transportDestinationTimeNow').on('click', function(){

    var date = new Date;
    var minutes = date.getMinutes();
    var hour = date.getHours();

    $('#routeConfirmDestinationTimeHour').val(hour);
    $('#routeConfirmDestinationTimeMinute').val(minutes);

    $('#routeConfirmDestinationTimeHour').trigger('keyup');
    $('#routeConfirmDestinationTimeMinute').trigger('keyup');
  });
});

function getTodayDate(){

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  today = yyyy+'-'+mm+'-'+dd;

  return today;
}

function insertTransport(){

  var data = getRouteConfirmDataArray();
  console.log(data);

  submitTransport(function(response){

    handleRouteConfirmResponse(response);
  }, data);
}

function handleRouteConfirmResponse(response){

  console.log(response);
  $('#cancelRouteConfirmRepeatButton').trigger('click');

  setTimeout(function(){

    if(response == 1)
      routeConfirmPositiveResponse();
    else
      routeConfirmNegativeResponse();

    generateTableRoutes();
    loadRoutes();
  }, 500);
}

function routeConfirmPositiveResponse(){

  var responseText = "Route was confirmed successfully.";
  $('#responseArea').css({
    'background-color' : 'rgba(0,255,0,0.1)',
    'border' : 'rgba(0,255,0,0.3)',
    'color' : 'green'
  }).html(responseText).slideDown(500);
  delaySlideUp('#responseArea', 5000);
}

function routeConfirmNegativeResponse(){

  var responseText = "Route could not be confirmed.";
  $('#responseArea').css({
    'background-color' : 'rgba(255,0,0,0.1)',
    'border' : 'rgba(255,0,0,0.3)',
    'color' : 'red'
  }).html(responseText).slideDown(500);
  delaySlideUp('#responseArea', 5000);
}

function getRouteConfirmDataArray(){

  var data = {};
  var order = getOrderDataArray();
  var route = getRouteDataArray();
  var transport = getTransportDataArray();
  var employee = getEmployeeDataArray();
  var company = getCompanyDataArray();

  data['order'] = order;
  data['route'] = route;
  data['transport'] = transport;
  data['employee'] = employee;
  data['company'] = company;

  return data;

}
function getOrderDataArray(){

  var order = {};

  order['customerEmail'] = $('#submitOrderCustomerEmail').html();
  order['dateTime'] = $('#submitOrderDate').html();
  order['from'] = $('#submitOrderFrom').html();
  order['to'] = $('#submitOrderTo').html();
  order['payment'] = $('#submitOrderPayment').html();
  order['pasangerPhone'] = $('#submitOrderPasangerPhone').html();
  order['pasangers'] = $('#submitOrderPasangers').html();
  order['names'] = getNamesDataArray();

  return order;
}

function getNamesDataArray(){

  var names = {};
  var index = 1;

  $('#submitCountriesNames').find('.rowDetailsValue').each(function(){
    var name = $(this).html();
    names['name' + index] = name;
    index++;
  });

  return names;
}

function getRouteDataArray(){

  var route = {};

  route['routeId'] = $('#submitRouteId').html();
  route['orderId'] = $('#submitOrderId').html();
  route['transporterEmail'] = $('#submitTransporter').html();
  route['carSpz'] = $('#submitCar').html();
  route['countries'] = getCountriesDataArray();

  return route;
}

function getCountriesDataArray(){

  var countries = {};
  var index = 1;

  $('#submitCountriesContainer').find('.rowDetailsValue').each(function(){
    var country = $(this).html();
    countries['country' + index] = country;
    index++;
  });

  return countries;
}

function getTransportDataArray(){

  var transport = {};
  var price = $('#submitPrice').html();
  var mealige = $('#submitMealige').html();


  transport['price'] = price.substring(0, (price.length - 4));
  transport['mealige'] = mealige.substring(0, (mealige.length -3));
  transport['arrivalDate'] = $('#submitArrivalDate').html();
  transport['arrivalTime'] = $('#submitArrivalTime').html();
  transport['arrivalDestinationDate'] = $('#submitDestinationArrivalDate').html();
  transport['arrivalDestinationTime'] = $('#submitDestinationArrivalTime').html();
  transport['duration'] = $('#submitDuration').html();
  transport['type'] = $('#submitTransportType').html();

  return transport;
}

function getEmployeeDataArray(){

  var employee = {};

  employee['employeeEmail'] = $('#submitConfirmedBy').html();
  employee['type'] = $('#submitType').html();

  return employee;
}

function getCompanyDataArray(){

  var company = {};

  company['name'] = $('#submitCompanyName').html();
  company['address'] = $('#submitCompanyAddress').html();
  company['ico'] = $('#submitCompanyIco').html();
  company['dic'] = $('#submitCompanyDic').html();

  return company;
}

function validateRouteConfirm(){

  var errorCounter = 0;

  $('.routeConfirmInput').each(function(){
    $(this).trigger('keyup');
  });

  validateDateHtml('#transportDate', '#routeConfirmDateError', /^[0-9-]*$/, 'Incorrect date', false);

  $('.routeConfirmError').each(function(){
    if($(this).is(":visible"))
      errorCounter++;
  });

  return errorCounter;
}

function hideRouteErrors(){

  $('.routeConfirmError').each(function(){
    $(this).hide();
  })
}

function repeatRouteConfirm(){

  $('#submitCountriesContainer').html('');
  $('#submitCountriesNames').html('');

  $('.routeConfirmFormArea').fadeOut(400);
  setTimeout(function(){
    $('.routeValidateFromArea').fadeIn(500);
  },500);

  var routeId = $('#routeConfirmRouteId').val();
  var orderId = $('#routeConfirmOrderId').val();
  loadRouteConfirmRepeat(routeId, orderId);
}

function confirmRoute(routeId, orderId){

  openRouteConfirm();
  $('#routeConfirmRouteId').val(routeId);
  $('#routeConfirmOrderId').val(orderId);
}

function updateRoute(element){

  var id = getOrderIdFromRoute(element);
  $('#confirmOrderAction').val('update');

  hideSections();
  loadOrder(id);
  loadCountries();
  checkAction(id);
  $('#transporterSelect').trigger('click');
}

function loadConfirmationFields(id){

  getRoutes(function(data){

    var route = data[0];
    var countries = [];
    $('#detailsIdRouteInput').val(route[0]);
    $('#transporterSelection').val(route[3]);
    $('#carSelection').val(route[4]);
    countries = route[5];

    setTimeout(function(){
      highlightCountries(countries);
    },1000);

  }, '', '', id);
}

function highlightCountries(countries){


  $('.countryCodeArea').each(function(){

    var title = $(this).find('.countryCodeTitle').html();

    for (index in countries){

      if(countries[index] == title){

        $('#selectedCounties').append(title + ' ');
        $(this).css({'background-color' : 'rgba(255, 0, 0,0.1)'});
        $(this).find('input').val('1');
      }
    }
  });

}

function openRouteConfirm(){

  hideConfirm();
  hideDetails();
  $('.routeValidateFromArea').hide();
  $('#datePickerRouteConfirm').hide();
  $('#datePickerRouteConfirmDestination').hide();
  $('.detailsResponseArea').hide().html('');
  $('#orderTableArea').css({'height' : '5%'});
  $('#responseArea').slideUp(300);

  setTimeout(function(){

    $('.routeConfirmFormArea').fadeIn(500);
    $('.routeConfirmArea').slideDown(500);
  }, 200);
}

function loadDetails(routeId, orderId){

  openRouteDetails();
  loadRouteDetails(routeId, orderId);

}

function hideDetails(){

  $('#orderTableArea').css({'height' : '40%'});
  $('.detailsSubContainer').html('');
  $('.routeDetailsFormArea').fadeOut();
  $('.routeDetailsArea').slideUp();
}

function hideConfirm(){

  $('#orderTableArea').css({'height' : '40%'});
  $('.detailsSubContainer').html('');
  $('.confirmFormArea').fadeOut();
  $('.confirmArea').slideUp();
}

function hideRouteConfirm(){

  clearRouteConfirm();
  $('#orderTableArea').css({'height' : '40%'});
  $('.routeFormArea').fadeOut();
  $('.area').slideUp();
}

function clearRouteConfirm(){

  //page 1/2
  $('#routeConfirmPrice').val('');
  $('#routeConfirmMealige').val('');
  $('#transportDate').html('Select date');
  $('#transportDestinationDate').html('Select date');
  $('#datePickerRouteConfirm').slideUp(300);
  $('#datePickerRouteConfirmDestination').slideUp(300);
  $('#routeConfirmTimeHour').val('');
  $('#routeConfirmTimeMinute').val('');
  $('#routeConfirmDestinationTimeHour').val('');
  $('#routeConfirmDestinationTimeMinute').val('');
  $('#transportTypeOfficial').trigger('click');

  //page 2/2
  $('#submitRouteId').html('');
  $('#submitOrderId').html('');
  $('#submitTransporter').html('');
  $('#submitCar').html('');
  $('#submitCountriesContainer').html('');

  $('#submitOrderCustomerEmail').html('');
  $('#submitOrderDate').html('');
  $('#submitOrderFrom').html('');
  $('#submitOrderTo').html('');
  $('#submitOrderPayment').html('');
  $('#submitOrderPasangerPhone').html('');
  $('#submitOrderPasangers').html('');
  $('#detailsCountriesNames').html('');

  $('#submitPrice').html('');
  $('#submitMealige').html('');
  $('#submitArrivalDate').html('');
  $('#submitTransportType').html('');

  $('#submitConfirmedBy').html('');
  $('#submitType').html('');

}

function openRouteDetails(){

  hideConfirm();
  hideRouteConfirm();
  $('.detailsResponseArea').hide();
  $('#orderTableArea').css({'height' : '5%'});
  $('#responseArea').slideUp(300);

  setTimeout(function(){

    $('.routeDetailsFormArea').fadeIn(300);
    $('.routeDetailsArea').slideDown(500);
  }, 200);
}

function loadRouteConfirmRepeat(routeId, orderId){

  getRoutes(function(data){

    fillSubmitRouteFiels(data[0]);
  }, '', '', orderId);

  getTransports(function(data){

    fillSubmitOrderFiels(data[0]);
    getCompany(function(dataCompany){

      fillCompanyFields(dataCompany);
    }, data[0]['email']);
  }, orderId, '', '', '');

  getOrderNames(function(data){

    fillNames(data, 'submitCountriesNames');
  }, orderId);

  fillTransportDetails();

  getSession(function(data){

    fillSenderDetails(data);
  });
}

function loadRouteDetails(routeId, orderId){

  getRoutes(function(data){

    fillDetailsRouteFiels(data[0]);
  }, '', '', orderId);

  getTransports(function(data){

    fillDetailsOrderFiels(data[0]);
  }, orderId, '', '', '');

  getOrderNames(function(data){

    fillNames(data, 'detailsCountriesNames');
  }, orderId);
}

function fillSubmitRouteFiels(route){

  calculateDistance(route[4], $('#routeConfirmMealige').val());

  $('#submitRouteId').html(route[0]);
  $('#submitOrderId').html(route[1]);
  $('#submitTransporter').html(route[3]);
  $('#submitCar').html(route[4]);

  for (var index in route[5]) {
    if (route[5].hasOwnProperty(index)) {

      if(index == 0)
        $('#submitCountriesContainer').append(generateDetailsLineBreaker());

      var titleIndex = parseInt(index) + 1;
      generateDetailsRow('Country ' + titleIndex, route[5][index], 'submitCountriesContainer');
    }
  }
}

function fillDetailsRouteFiels(route){

  $('#detailsRouteId').html(route[0]);
  $('#detailsOrderId').html(route[1]);
  $('#detailsTransporter').html(route[3]);
  $('#detailsCar').html(route[4]);

  for (var index in route[5]) {
    if (route[5].hasOwnProperty(index)) {

      if(index == 0)
        $('#detailsCountriesContainer').append(generateDetailsLineBreaker());

      var titleIndex = parseInt(index) + 1;
      generateDetailsRow('Country ' + titleIndex, route[5][index], id);
    }
  }
}

function fillSubmitOrderFiels(order){

  $('#submitOrderCustomerEmail').html(order['email']);
  $('#submitOrderDate').html(order['date']);
  $('#submitOrderFrom').html(order['from']);
  $('#submitOrderTo').html(order['to']);
  $('#submitOrderPayment').html(order['payment']);
  $('#submitOrderPasangerPhone').html(order['phone']);
  $('#submitOrderPasangers').html(order['pasangers']);
}

function fillDetailsOrderFiels(order){

  $('#detailsOrderCustomerEmail').html(order['email']);
  $('#detailsOrderDate').html(order['date']);
  $('#detailsOrderFrom').html(order['from']);
  $('#detailsOrderTo').html(order['to']);
  $('#detailsOrderPayment').html(order['payment']);
  $('#detailsOrderPasangerPhone').html(order['phone']);
  $('#detailsOrderPasangers').html(order['pasangers']);
}

function fillNames(names, id){

  for (var index in names) {
    if (names.hasOwnProperty(index)) {

      if(index == 0)
        $('#' + id).append(generateDetailsLineBreaker());

      nameTitle = parseInt(index) + 1;
      generateDetailsRow('Name' + nameTitle, names[index], id);
    }
  }

  $('#' + id).append(generateDetailsLineBreaker());
}

function fillTransportDetails(){

  var price = $('#routeConfirmPrice').val();
  var mealige = $('#routeConfirmMealige').val();
  var arrivalDate = $('#transportDate').html();
  var transportType = $('#transportTypeValue').val();
  var arrivalHour = $('#routeConfirmTimeHour').val();
  var arrivalMinute = $('#routeConfirmTimeMinute').val();
  var arrivalTime = arrivalHour + ':' + arrivalMinute + ':00';
  var arrivalDestinationDate = $('#transportDestinationDate').html();
  var arrivalDestinationHour = $('#routeConfirmDestinationTimeHour').val();
  var arrivalDestinationMinute = $('#routeConfirmDestinationTimeMinute').val();
  var arrivalDestinationTime = arrivalDestinationHour + ':' + arrivalDestinationMinute + ':00';
  var durationSeconds = calculateTransportDuration(arrivalDate, arrivalTime, arrivalDestinationDate, arrivalDestinationTime);
  var durationTime = durationSeconds.toString().toHHMMSS();

  $('#submitPrice').html(price + ' EUR');
  $('#submitMealige').html(mealige + ' km');
  $('#submitTransportType').html(transportType);
  $('#submitArrivalDate').html(arrivalDate);
  $('#submitArrivalTime').html(arrivalTime);
  $('#submitDestinationArrivalDate').html(arrivalDestinationDate);
  $('#submitDestinationArrivalTime').html(arrivalDestinationTime);
  $('#submitDuration').html(durationTime);
}

function fillSenderDetails(sender){

  $('#submitConfirmedBy').html(sender['email']);
  $('#submitType').html(sender['type']);
}

function fillCompanyFields(dataCompany){

  if(dataCompany['name'].length <= 0){

    $('#submitCompanyName').html('-');
    $('#submitCompanyAddress').html('-');
    $('#submitCompanyIco').html('-');
    $('#submitCompanyDic').html('-');
  }
  else{

    $('#submitCompanyName').html(dataCompany['name']);
    $('#submitCompanyAddress').html(dataCompany['address']);
    $('#submitCompanyIco').html(dataCompany['ico']);
    $('#submitCompanyDic').html(dataCompany['dic']);
  }
}

function calculateDistance(spz, transportMealige){

  var distance = 0;
  var carMealige = 0;

  getCars(function(data){

  carMealige = data['car1'].Mealige;
  distance = transportMealige - carMealige;
  $('#submitDistance').html(distance + ' km');
  }, spz);
}

function calculateTransportDuration(date1, time1, date2, time2){

  var datetime1 = new Date(date1 + ' ' + time1);
  var datetime2 = new Date(date2 + ' ' + time2);

  if(datetime1 == 'Invalid Date' || datetime2 == 'Invalid Date')
    return 'unknown';

  var totalTime = (datetime2 - datetime1)/1000;
  return totalTime;

}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function generateDetailsRow(title, value, id){

  var html =    '<div class="routeDetailsRow">' +
                  '<div class="rowDetailsTitle smallText">'+ title +' :</div>' +
                  '<div class="rowDetailsValue smallText">'+value+'</div>' +
                '</div>';

  $('#' + id).append(html);
}

function generateDetailsLineBreaker(){

  var html = '<div class="lineBreak"></div>';
  return html;
}

function getOrderIdFromRoute(element){

  var routeId = $(element).parent().find($('input[name = "oid"]')).val();
  return routeId;
}

function loadRoutes(){

  getRoutes(function(data){
    console.log(data);
    for (index in data){
      generateTableRowRoutes(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5]);

    }
  }, '', '', '');
}

function closeSubElementsOnLoad(){

  hideDetails();
  hideConfirm();
  hideRouteConfirm();
  $('#responseArea').slideUp(300).html('');

}


function generateTableRoutes(){

  $('#orderTableArea').html('');
  var html = '<table class="smallText" id="routesTable">' +
                '<tr class = "tableHeader">' +
                  '<td class="idCol">ID</td>' +
                  '<td class="idCol">OID</td>' +
                  '<td class="dateColRoute">Date</td>';

  if($('#type').val() == 'manager')
    html += '<td>Transporter</td>';

  html +=         '<td>Car</td>' +
                  '<td>Countries</td>' +
                  //'<td class="buttonColumnHeader"></td>' +
                  '<td class="buttonColumnHeader"></td>';

  if($('#type').val() == 'manager')
    html+= '<td class="buttonColumnHeader"></td>';

  html += '</tr>';
   $('#orderTableArea').html(html);
}

function generateTableRowRoutes(id, oid, date, email, spz, countryCodes){

  var countryString = getCountryString(countryCodes);

  var html =      '<tr class = "tableRow" id="'+id+'">' +
                      '<td><input type="text" class="tableInput tableInputSmall" name="id" value="'+ id +'" disabled></td>' +
                      '<td><input type="text" class="tableInput tableInputSmall" name="oid" value="'+ oid +'" disabled></td>' +
                      '<td><input type="text" class="tableInput" name="date" value="'+ date +'" disabled></td>';
  if($('#type').val() == 'manager')
    html +=           '<td><input type="text" class="tableInput" name="email" value="'+ email +'" disabled></td>';

  html +=             '<td><input type="text" class="tableInput" name="spz" value="'+ spz +'" disabled></td>' +
                      '<td><input type="text" class="tableInput" name="countries" value="'+ countryString +'" disabled></td>';

  if($('#type').val() == 'manager')
    html += '<td class="buttonColumn routeDeleteButton">Delete</td>' +
            '<td class="buttonColumn routeUpdateButton">Update</td>';

  html +=             //'<td class="buttonColumn routeStickersButton">Check stickers</td>' +
                      '<td class="buttonColumn routeDetailsButton">Details</td>';
  if(checkRouteDate(date) == true)
    html += '<td class="buttonColumn routeConfirmButton routeStandardWidth">Confirm</td>';
  else
    html += '<td class="buttonColumn emptyButton routeStandardWidth"></td>';

    html += '</tr>';
  $('#routesTable').append(html);
}

function checkRouteDate(date){

  var todayDate = new Date();
  var transportDate = new Date(date);

  if(todayDate > transportDate)
    return true;

  return false;
}

function getCountryString(countryCodes){

  if(countryCodes.length <= 0)
    return '';

  var countryString = '';

  for (index in countryCodes){

    countryString += countryCodes[index] + ' ';
  }

  return countryString;
}

function generateDeleteAlertRoute(routeId, orderId){

  var message = "Are you sure, that you want to delete this route (ID: "+routeId+") and order (ID: "+orderId+") with it assosiated?";
  var html = '<br><input type = "button" id="confirmDelete" class ="alertButton" value="YES">' +
              '<input type="button" id="denyDelete" class ="alertButton" value="NO">' +
              '<input type="hidden" id = "'+orderId+'" name = "deleteRowId">';
  return message + html;
}
