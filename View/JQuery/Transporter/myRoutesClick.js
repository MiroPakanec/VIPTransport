$(function(){

  $('#titleRoutes').click(function(){

    closeElementsOnLoadRoutes();
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

  $("#datePickerRouteConfirm").datepicker({
          inline: true,
          showOtherMonths: true,
          dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          dateFormat: "dd/mm/yy",
          maxDate: '+6M',
          onSelect: function (date) {
                  $('#transportDate').html(date);
                  $('#datePickerRouteConfirm').slideToggle(500);
              }
  });

  $('#transportDate').on('click', function(){
    $('#datePickerRouteConfirm').slideToggle(500);
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

    today = dd+'/'+mm+'/'+yyyy;
    $('#transportDate').html(today);
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
});

function insertTransport(){

  var data = getRouteConfirmDataArray();
}

function getRouteConfirmDataArray(){

  var data = {};
  var order = getOrderDataArray();
  var route = getRouteDataArray();
  var transport = getTransportDataArray();
  var employee = getEmployeeDataArray();

  data['order'] = order;
  data['route'] = route;
  data['transport'] = transport;
  data['employee'] = employee;

  console.log(data);

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
  route['transporterEmal'] = $('#submitTransporter').html();
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

  transport['price'] = $('#submitPrice').html();
  transport['mealige'] = $('#submitMealige').html();
  transport['arrivalDate'] = $('#submitArrivalDate').html();
  transport['arrivalTime'] = $('#submitArrivalTime').html();
  transport['type'] = $('#submitTransportType').html();

  return transport;
}

function getEmployeeDataArray(){

  var employee = {};

  employee['employeeEmail'] = $('#submitConfirmedBy').html();
  employee['type'] = $('#submitType').html();

  return employee;
}

function validateRouteConfirm(){

  var errorCounter = 0;

  $('.routeConfirmInput').each(function(){
    $(this).trigger('keyup');
  });

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
  $('#transporterSelection').html('');
  $('#routeConfirmMealige').html('');
  $('#transportDate').val('Select date');
  $('#datePickerRouteConfirm').slideUp(300);
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

  $('#submitPrice').html(price + ' EUR');
  $('#submitMealige').html(mealige + ' km');
  $('#submitArrivalDate').html(arrivalDate);
  $('#submitTransportType').html(transportType);
  $('#submitArrivalTime').html(arrivalTime);
}

function fillSenderDetails(sender){

  $('#submitConfirmedBy').html(sender['email']);
  $('#submitType').html(sender['type']);
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

function closeElementsOnLoadRoutes(){

  var height = ( 100 * parseFloat($('#orderTableArea').css('height')) / parseFloat($('#orderTableArea').parent().css('height')) );
  if(height < 20)
    $('#cancelConfirmButton').trigger('click');

  manageTitleCss('#titleRoutes', '#titleOrder', '#titleTransport', '0.05');
  $('.orderSearchBarArea').slideUp(500);
  $('#responseArea').slideUp(300).html('');
}


function generateTableRoutes(){

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
                      '<td class="buttonColumn routeDetailsButton">Details</td>' +
                      '<td class="buttonColumn routeConfirmButton">Confirm</td>' +
                    '</tr>';
  $('#routesTable').append(html);
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
