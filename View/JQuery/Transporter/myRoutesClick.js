$(function(){

  $('#titleRoutes').click(function(){

    closeElementsOnLoadRoutes();
    generateTableRoutes();
    loadRoutes();
  });

  $(document).on('click', '.routeStickersButton', function(){

    var spz = $(this).parent().find($('input[name = "spz"]')).val();
    var routeId = $(this).parent().find($('input[name = "id"]')).val();

    checkStickers(function(message){

      $('#responseArea').html(message).css({
        'background-color' : 'rgba(255,255,255,0.1)',
        'color' : 'white',
        'border' : '1px solid rgba(255,255,255,0.3)'
      }).slideDown(500);

      delaySlideUp('#responseArea', 20000);
    }, spz, routeId);
  });

  $(document).on('click','.routeDeleteButton',function(){

    var orderId = $(this).parent().find($('input[name = "oid"]')).val();
    var routeId = $(this).parent().find($('input[name = "id"]')).val();
    //put id into the hidden field
    var alertText = generateDeleteAlertRoute(routeId, orderId);

    $('#responseArea').html(alertText).css({
      'background-color' : 'rgba(255,255,255,0.1)',
      'color' : 'white',
      'border' : '1px solid rgba(255,255,255,0.3)'
    }).html(alertText).slideDown(500);
  });

  $(document).on('click', '.routeUpdateButton', function(){

    var element = $(this);
    updateRoute(element);

    setTimeout(function(){
      $('.confirmFormArea').fadeIn(500);
    },400);
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

  }, '', id);
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
  }, '', '');
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

  html +=             '<td class="buttonColumn routeStickersButton">Check stickers</td>' +
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
