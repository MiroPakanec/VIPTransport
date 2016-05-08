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

  $(document).on('click', '.routeDeleteButton', function(){

    
  });
});

function loadRoutes(){

  getRoutes(function(data){
    console.log(data);
    for (index in data){
      generateTableRowRoutes(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5]);

    }
  }, '');
}

function closeElementsOnLoadRoutes(){

  $('.confirmFormArea').fadeOut(500);


  $('#orderTableArea').html('');
  $('.orderSearchBarArea').slideUp(500);
  manageTitleCss('#titleRoutes', '#titleOrder', '#titleTransport', '0.05');
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
    html += '<td class="buttonColumn routeDeleteButton">Delete</td>';

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
