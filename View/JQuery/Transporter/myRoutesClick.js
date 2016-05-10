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

    loadDetails(routeId, orderId);
  })

  $(document).on('click','.routeDeleteButton',function(){

    var orderId = $(this).parent().find($('input[name = "oid"]')).val();
    var routeId = $(this).parent().find($('input[name = "id"]')).val();
    //put id into the hidden field
    var alertText = generateDeleteAlertRoute(routeId, orderId);

    hideDetails();
    hideConfirm();
    $('#responseArea').html(alertText).css({
      'background-color' : 'rgba(255,255,255,0.1)',
      'color' : 'white',
      'border' : '1px solid rgba(255,255,255,0.3)'
    }).html(alertText).slideDown(500);
  });

  $(document).on('click', '.routeUpdateButton', function(){

    var element = $(this);

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
});

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

function openRouteDetails(){

  hideConfirm();
  $('.detailsResponseArea').hide();
  $('#orderTableArea').css({'height' : '5%'});
  $('#responseArea').slideUp(300);

  setTimeout(function(){

    $('.routeDetailsFormArea').fadeIn(300);
    $('.routeDetailsArea').slideDown(500);
  }, 200);
}

function loadRouteDetails(routeId, orderId){

  getRoutes(function(data){

    fillDetailsRouteFiels(data[0]);
  }, '', '', orderId);

  getTransports(function(data){

    fillDetailsOrderFiels(data[0]);
  }, orderId, '', '', '');

  getOrderNames(function(data){

    fillDetailsNames(data);
  }, orderId);
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
      generateDetailsRow('Country ' + titleIndex, route[5][index], 'detailsCountriesContainer');
    }
  }
}

function fillDetailsOrderFiels(order){

  $('#detailsOrderDate').html(order['date']);
  $('#detailsOrderFrom').html(order['from']);
  $('#detailsOrderTo').html(order['to']);
  $('#detailsOrderPayment').html(order['payment']);
  $('#detailsOrderPasangerPhone').html(order['phone']);
  $('#detailsOrderPasangers').html(order['pasangers']);
}

function fillDetailsNames(names){

  for (var index in names) {
    if (names.hasOwnProperty(index)) {

      if(index == 0)
        $('#detailsCountriesNames').append(generateDetailsLineBreaker());

      nameTitle = parseInt(index) + 1;
      generateDetailsRow('Name' + nameTitle, names[index], 'detailsCountriesNames');
    }
  }

  $('#detailsCountriesNames').append(generateDetailsLineBreaker());
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
                  '<td class="dateCol">Date</td>' +
                  '<td>Transporter</td>' +
                  '<td>Car</td>' +
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
                      '<td><input type="text" class="tableInput" name="date" value="'+ date +'" disabled></td>' +
                      '<td><input type="text" class="tableInput" name="email" value="'+ email +'" disabled></td>' +
                      '<td><input type="text" class="tableInput" name="spz" value="'+ spz +'" disabled></td>' +
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
