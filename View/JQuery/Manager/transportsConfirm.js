$(function(){

  $(document).on('click', '.confirmButton', function(){

    var element = $(this);
    confirmOrder(element);

    setTimeout(function(){
      $('.confirmFormArea').fadeIn(500);
    },400);
  });

  $(document).on('click', '#transporterSelect', function(){

    manageSelectionButtonCss($(this));
    loadTransporters();
  });

  $(document).on('click', '#carSelect', function(){

    manageSelectionButtonCss($(this));
    loadCars();
  });

  $(document).on('click', '.selectUserButton', function(){

    var email = $(this).parent().attr('id');
    $('#transporterSelection').val(email);
    $('#transporterSelection').trigger('blur');
  });

  $(document).on('click', '.selectCarButton', function(){

    var spz = $(this).parent().attr('id');
    $('#carSelection').val(spz);
    $('#carSelection').trigger('blur');
  });

  $(document).on('click', '.countryCodeArea', function(){

    var value = $(this).find('input').val();
    if(value == '0'){

      $(this).css({'background-color' : 'rgba(255, 0, 0,0.1)'});
      $(this).find('input').val('1');
    }

    else if($(this).find('input').val('1')){

      $(this).css({'background-color' : 'rgba(255, 255, 255,0)'});
      $(this).find('input').val('0');
    }

    loadSelectedCountryCodes();
  });

  $(document).on('click', '#clearConfirmButton', function(){

    $('#transporterSelection').val('');
    $('#carSelection').val('');
    $('#transporterSelect').trigger('click');
    $('.confirmError').slideUp(500);
    resetCountryCodes();
  });

  $(document).on('click', '#cancelConfirmButton', function(){

    $('#clearConfirmButton').trigger('click');
    hideSections();
    $('.confirmFormArea').fadeOut(500);
    setTimeout(function(){

        $('.confirmArea').slideUp(300);
        $('#orderTableArea').css({'height' : '40%'});

    },500);

  });

  $(document).on('click', '#submitConfirmButton', function(){

    submitOrderConfirmation();
  });

  $(document).on('blur', '#transporterSelection', function(){

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    validateString('#transporterSelection', '#transporterSelectError', emailRegex, 'Incorrect email', 2, 50, false);
  });

  $(document).on('blur', '#carSelection', function(){

    validateSpz('#carSelection', '#carSelectError', /^[A-Z0-9-]*$/, 'Incorrect spz', 2, 50, false);
  });
});

function submitOrderConfirmation(){

  if(validateOrderSubmit() == false)
    return;

  var orderId = $('#detailsIdInput').val();
  var countryArray = getAllCountryCodes();
  var transporter =  $('#transporterSelection').val();
  var car = $('#carSelection').val();
  var data = {};

  data['countryCodes'] = countryArray;
  data['transporter'] = transporter;
  data['car'] = car;
  data['orderId'] = orderId;

  $('#cancelConfirmButton').trigger('click');

  submitOrderRequest(function(responseData){

    handleSubmitResponse(responseData);
  }, data);
}

function handleSubmitResponse(responseData){

  if(responseData === null)
    return;

  var responseText = getResponseText(responseData);
  var responseStatus = responseData.status;

  if(responseStatus == 1){

    $('#titleOrder').trigger('click');
    $('#responseArea').html(responseText).css({
      'background-color' : 'rgba(0,255,0,0.05)',
      'color' : 'green',
      'border' : '1px solid rgba(0,255,0,0.3)'
    }).html(responseText);
  }
  else{

    $('#responseArea').html(responseText).css({
      'background-color' : 'rgba(255,0,0,0.05)',
      'color' : 'red',
      'border' : '1px solid rgba(255,0,0,0.3)'
    }).html(responseText);
  }

  setTimeout(function(){

    $('#responseArea').slideDown(500);
    delaySlideUp('#responseArea', 20000);
  }, 1000);

}

function getResponseText(responseData){

  var responseMessage = responseData.message;
  var responseStatus = responseData.status;
  var responseWarning = responseData.warning;
  var responseText = '';

  if(responseStatus == 1)
    responseText = 'Order was confirmed successfully. </br>' + responseWarning;
  else if(responseText == 0)
    responseText = 'Order could not be confirmed. </br>' + responseMessage;

  return responseText;
}

function validateOrderSubmit(){

  $('#transporterSelection').trigger('blur');
  $('#carSelection').trigger('blur');

  var errorCounter = 0;

  $('.confirmError').each(function(){

    if($(this).is(":visible"))
      errorCounter++;
  });

  if(errorCounter > 0)
    return false;

  return true;
}

function getAllCountryCodes(){

  var countryCodes = [];
  $('.countryCodeTitle').each(function(){

    if($(this).next().find('.countryCodeCheckBox').val() == '1')
      countryCodes.push($(this).html());
  });

  return countryCodes;
}

function resetCountryCodes(){

  $('#selectedCounties').html('<strong>Selected: </strong>');
  $('.countryCodeArea').each(function(){

    $(this).css({'background-color' : 'rgba(255, 255, 255 ,0)'});
    $(this).find('input').val('0');
  });
}

function loadSelectedCountryCodes(){

  $('#selectedCounties').html('<strong>Selected: </strong>');
  $('.countryCodeCheckBox').each(function(){

    var countryCode = $(this).parent().parent().find('.countryCodeTitle').html();
    var value = $(this).val();

    if(value == '1')
      $('#selectedCounties').append(' ' + countryCode);
  });
}

function manageSelectionButtonCss(element){

  $('.selectionButton').each(function(){
    $(this).css({'background-color' : 'rgba(255,255,255,0)'});
  });

  $(element).css({'background-color' : 'rgba(255,255,255,0.1)'});
}

function confirmOrder(element){

  var id = getOrderId(element);
  hideSections();
  loadOrder(id);
  loadCountries();
  $('#transporterSelect').trigger('click');
}

function hideSections(){

  $('#responseArea').slideUp(300);
  $('#orderTableArea').css({'height' : '4.9%'});
  $('.confirmArea').slideDown(500);
  $('.confirmError').slideUp(500);
  $('#detailsIdInput').val('');
}

function getOrderId(element){

  var id = $(element).parent().attr('id');
  return id;
}

function loadOrder(id){

  getTransports(function(data){

    managerOrderDetails(data[0]);
  }, id, '', '', '');

  getOrderNames(function(data){

    manageNames(data);
  }, id);
}

function loadTransporters(){

  getEmployeess(function(data){

    generateUserTableHeader();
    for (index in data){

      generateUserTableRow(data[index].email, data[index].fname, data[index].lname);
    }
  }, '', '', '', 'transporter');
}

function loadCars(){

  getCars(function(data){

    generateCarTableHeader();
    for(index in data){

      var status = checkCarStatus(data[index]);
      generateCarTableRow(data[index].Spz ,data[index].Brand, data[index].Type, status);
    }
  }, '');
}

function loadCountries(){

  getCountriesEurope(function(data){

    $('#countrySelection').html('');
    for(index in data){

      addCountryCode(data[index].alpha2Code);
    }
  });
}

function addCountryCode(country){

  var html =  '<div class="countryCodeArea">' +
                '<div class="countryCodeTitle">'+country+'</div>'+
                '<div class="countryCodeCheck">' +
                  '<input type="hidden" value="0" class="countryCodeCheckBox">'+
                '</div>' +
              '</div>';

  $('#countrySelection').append(html);
}

function checkCarStatus(car){

  var status = false;
  var now = new Date();
  var emissionCheckDate = new Date(car.EmissionCheck);
  var stkDate = new Date(car.Stk);
  var mandatoryInsuranceDate = new Date(car.MandatoryInsurance);
  var accidentInsuranceDate = new Date(car.AccidentInsurance);

  if(car.State == 'offhand')
    return false;
  else if(emissionCheckDate < now)
    return false;
  else if(stkDate < now)
    return false;
  else if(mandatoryInsuranceDate < now)
    return false;
  else if(accidentInsuranceDate < now)
    return false;

  return true;
}

function managerOrderDetails(order){

  $('#detailsIdInput').val(order.id);
  $('#detailsId').html('<strong>ID: </strong> ' + order.id);
  $('#detailsDate').html('<strong>Date: </strong> ' + order.date);
  $('#detailsFrom').html('<strong>From: </strong> ' + order.from);
  $('#detailsTo').html('<strong>To: </strong> ' + order.to);
  $('#detailsPayment').html('<strong>Payment: </strong> ' + order.payment);
  $('#detailsPasangerPhone').html('<strong>Phone on pasanger: </strong> ' + order.phone);
  $('#detailsPasangers').html('<strong>Pasangers: </strong> ' + order.pasangers);
}

function manageNames(names){

  var namesString = '';

  for(i = 0; i< names.length; i++){

    namesString+= names[i];
    if(i != names.length -1)
      namesString += ', ';
  }

  $('#detailsNames').html('<strong>Names: </strong> ' + namesString);
}

function generateUserTableHeader(){

  var html = '<table class="smallText" id="usersTable">' +
                '<tr class = "tableHeader">' +
                  '<td class="emailCol">Email</td>' +
                  '<td>First name</td>' +
                  '<td>Last name</td>' +
                  '<td class="buttonColumnHeader"></td>' +
                '</tr>';

   $('#managerSelectionColumn').html(html);
}

function generateCarTableHeader(){

  var html = '<table class="smallText" id="carTable">' +
                '<tr class = "tableHeader">' +
                  '<td>Spz</td>' +
                  '<td>Brand</td>' +
                  '<td>Type</td>' +
                  '<td class="buttonColumnHeader"></td>' +
                '</tr>';

   $('#managerSelectionColumn').html(html);
}

function generateUserTableRow(emial, fname, lname){

  var html =  '<tr class = "tableRow" id="'+emial+'">' +
                '<td><input type="text" class="tableInput" name="email" value="'+ emial +'" disabled></td>' +
                '<td><input type="text" class="tableInput" name="fname" value="'+ fname +'" disabled></td>' +
                '<td><input type="text" class="tableInput" name="lname" value="'+ lname +'" disabled></td>' +
                '<td class="buttonColumn selectButton selectUserButton">'+ 'Select' +'</td>' +
              '</tr>';

  $('#usersTable').append(html);
}

function generateCarTableRow(spz, brand, type, status){

  if(status == true)
    var html =  '<tr class = "tableRow" id="'+spz+'">' +
                '<td><input type="text" class="tableInput" name="email" value="'+ spz +'" disabled></td>' +
                '<td><input type="text" class="tableInput" name="fname" value="'+ brand +'" disabled></td>' +
                '<td><input type="text" class="tableInput" name="lname" value="'+ type +'" disabled></td>' +
                '<td class="buttonColumn selectButton selectCarButton">'+ 'Select' +'</td>' +
              '</tr>';
else
    var html =  '<tr class = "tableRow" id="'+spz+'">' +
                '<td><input type="text" class="tableInput invalidRow" name="email" value="'+ spz +'" disabled></td>' +
                '<td><input type="text" class="tableInput invalidRow" name="fname" value="'+ brand +'" disabled></td>' +
                '<td><input type="text" class="tableInput invalidRow" name="lname" value="'+ type +'" disabled></td>';
              '</tr>';


  $('#carTable').append(html);
}
