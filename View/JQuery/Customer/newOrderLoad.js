$(function(){

    getSession(function(data){

      if(data.email.length == 0){
          window.location="mainPage.html";
      }

      $('#orderEmail').val(data.email);

      if(data.type == 'customer')
        $('#userType').val('customer');
      else if(data.type == 'manager')
        $('#userType').val('manager');
    }),

    loadNotificationsAmmount();
    loadDefaults();

    setTimeout(function(){
        loadSessionDependencies();
        updateOrder();
    },100);
})

//LOAD

function loadSessionDependencies(){

  var type = $('#userType').val();

  if(type == 'customer'){

    generateCustomerButtons();
    getCompanyData($('#orderEmail').val());
  }
  else if(type == 'manager'){

    generateManagerButtons();
    $('#orderEmail').val('');
    getCompanyData($('#orderEmail').val());
    $('#userEmailRow').slideDown(500);
  }
}

function loadDefaults(){

  $('#userEmailRow').hide();
  $('.paymentSelection').hide(0);
  $('#datepickerMain').hide();
  $('#orderClock').val('AM');
  $('#orderResponseField').hide();
  generatePasangers($('#orderPasangers').html());
  $('.errorMessage').hide();
}

function getCompanyData(email){

  getCompany(function(data){

    console.log(data);
    checkInvoice(data);
  }, email);
}

//****

//form submit
$(function(){

    $('#orderForm').on('submit', function(e){

      e.preventDefault();

      if(validateOrderConfirm().length > 0)
        return;

      var url = $(this).attr('action');
      var type = $(this).attr('method');
      var data = {};
      var names = {};
      $('input[name^="order"]').each(function(index, value){

        var name = $(this).attr('name').slice(5);
        var value = $(this).val();
        data[name] = value;
      }),
      $('div[name^="order"]').each(function(index, value){

        var name = $(this).attr('name').slice(5);
        var value = $(this).html();
        data[name] = value;
      }),
      $('input[name^="pasangerName"]').each(function(index, value){

        var name = $(this).attr('name').slice(8);
        var value = $(this).val();
        names[name] = value;
      }),

      data['Names'] = names;
      if($('#orderConfirmButton').val() == 'Confirm')
        data['Operation'] = 'create';
      else if ($('#orderConfirmButton').val() == 'Update'){

        data['Operation'] = 'update';
        data['Id'] = getParameterByName('id');
      }

      console.log(data);
      $.ajax({
        url: url,
        type: type,
        data: data,
        success: function(response){
          console.log(response);
          handleOrderResponse(response);
        },
        error: function(){
        $('#orderResponse').slideDown(500).html('We are sorry, something went wrong');
        }
      })
    })
})

function checkInvoice(data){

    if(data.address.length == 0){

      $('#paymentBill').css({
        'background-color' : 'rgba(255,0,0,0.2)',
        'color' : 'red',
        'border' : '1px solid rgba(255,0,0,0.2)'
      }).off('click');

    $('#errorOrderPaymentType').html("To use invoice option, please add a company in 'My Profile'").slideDown(500);
  }
  else{

    $('#paymentBill').hide();
    $('#errorOrderPaymentType').html("");
  }
}

function updateOrder(){

  //get url params
  if(getParameterByName('update')){

    $(".title").html('Update Order');
    $("#orderClearButton").val('Cancel changes');
    $('#orderEmail').prop('disabled', true);
    //get data with ID
    id = getParameterByName('id');
    autoFillFields(id);

    setTimeout(function() {
      $("#orderConfirmButton").val('Update');
    },10);

    appendBackButton('#orderClearButton');
  }
}

function appendBackButton(id){

  var html = '<input type="button" name="clearOrder" value="Back" class="button" id="orderBackButton">';
  $(id).after(html);
}

function getNames(id){

  getOrderNames(function(data){
    for (index in data){

      $('#orderPasangerName' + index).val(data[index]);
    }
  }, id)

}

function autoFillFields(id){

  getTransports(function(data){

    var dateString = data[0].date;
    var clock = dateString.substring(20,22);
    var email = data[0].email;

    $('#orderDate').html(dateString.substring(0,10));
    $('#orderTimeHour').val(dateString.substring(11,13));
    $('#orderTimeMinute').val(dateString.substring(14,16));

    if(clock == "PM"){

      $('#timeButtonPM').css({
        'background-color' : 'rgba(255,255,255,0.3)'
      });
      $('#timeButtonAM').css({
        'background-color' : 'rgba(255,255,255,0)'
      });
    }
    else if(clock == "AM"){

      $('#timeButtonAM').css({
        'background-color' : 'rgba(255,255,255,0.3)'
      });
      $('#timeButtonPM').css({
        'background-color' : 'rgba(255,255,255,0)'
      });
    }

    $('#orderEmail').val(email);
    $('#orderFrom').val(data[0].from);
    $('#orderTo').val(data[0].to);
    $('#orderPhone').val(data[0].phone);
    $('#paymentTypeButton').html(data[0].payment);
    $('#orderPasangers').html(data[0].pasangers);

    generatePasangers(data[0].pasangers);
    getCompanyData($('#orderEmail').val());
    getNames(id);
    validateGenerated();

  }, id, '', '', '')
}

function handleOrderResponse(response){

  console.log(response);

  if(response == 1)
    window.location = "myTransportsPage.html?added=0&updated=-1";
  else if(response == 2){

    var responseText = "No changes were made";
    $('#orderResponseField').slideDown(500).css({
     'background-color' : 'rgba(255, 255, 255, 0.1)'
    });
    $('#orderResponseText').html(responseText).css({
     'color' : 'white'
    });
  }
  else if(response == 3){
    window.location = "myTransportsPage.html?added=-1&updated="+getParameterByName('id');
  }
  else{

    var responseText = "We are sorry, your order could not be processed.<br>Make sure imported names are not the same.";
    $('#orderResponseField').slideDown(500).css({
     'background-color' : 'rgba(255, 0, 0, 0.1)'
    });
    $('#orderResponseText').html(responseText).css({
     'color' : 'red'
    });
 }
}

//on clear
$(function(){

  $('#orderClearButton').on('click', function(){

    id = getParameterByName('id');
    if($("#orderClearButton").val() === 'Cancel changes'){

      autoFillFields(id);
    }
    else{

      clierFields();
      clearResponse();
    }
  })
})

function clierFields(){

  if($("#orderClearButton").val() === 'Cancel changes'){

    autoFillFields(id);
  }

  $('#orderDate').html('Select date');
  $('#datepickerMain').slideUp(500);
  $('#orderTimeHour').val('');
  $('#orderTimeMinute').val('');
  $('#orderFrom').val('');
  $('#orderTo').val('');
  $('#paymentTypeButton').html('Select payment');
  $('#orderPasangers').html('2');

  generatePasangers(2);
  validateGenerated();
}

function clearResponse(){

  $('.errorMessage').slideUp(500);
  $('#orderResponseField').slideUp(500);
}

//on confirm
function validateOrderConfirm(){

  var error = '';
  //trigger blur - to repeat automatic error check on click
  $('input[id^="order"]').trigger('blur');
  validateOrderButtons();

  $(".errorMessage").each(function(index){

    error =  error + $(this).html();
    if($(this).html().length > 0)
      $(this).toggle( "pulsate", 100).toggle( "pulsate", 100);
  });

  return error;
}

//on blur
$(function(){

  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  validateOrderTime('blur', '#orderTimeHour', '#errorOrderDepartureTime', /^[0-9]*$/, 12, 0, 'hour');
  validateOrderTime('blur', '#orderTimeMinute', '#errorOrderDepartureTime', /^[0-9]*$/, 59, 0, 'minute');
  validateOrderInput('blur', '#orderFrom', '#errorOrderFrom');
  validateOrderInput('blur', '#orderTo', '#errorOrderTo');
  validateOrderName('blur', '#orderPhone', '#errorOrderPhone', /^[0-9+]*$/);
  validateOrderName('blur', '#orderEmail', '#errorOrderEmail', emailRegex);

  validateGenerated();
})

function validateGenerated(){

  //validateOrderInput('blur', '#test0', '#teest0');
  $('.generatedInputField').each(function(i){

    validateOrderName('blur', '#orderPasangerName'+i, '#errorOrderPasangerName'+i, /^[a-zA-Z\s]*$/);
  })
}

function validateOrderTime(thisEvent, id, idErr, regex, max, min, name){

  $(id).on(thisEvent, function(){

    var value = $(this).val().trim();
    $(id).val(value);

    if(!value)
      $(idErr).html('Cannot be empty').slideDown(500);
    else if(value < min || value > max)
      $(idErr).html('Incorrect '+name+' (' + min + ' - ' + max + ')').slideDown(500);
    else if(!regex.test(value))
      $(idErr).html('Incorrect value').slideDown(500);
    else if(value.length == 1)
      $(this).val('0' + value);
    else
      $(idErr).html('').slideUp(500);
  })
}

function validateOrderName(thisEvent, id, idErr, regex){

  $(id).on(thisEvent, function(){
    var value = $(this).val().trim();
    $(id).val(value);

    if(!value)
      $(idErr).html('Cannot be empty').slideDown(500);
    else if(!regex.test(value))
      $(idErr).html('Incorrect character').slideDown(500);
    else
      $(idErr).html('').slideUp(500);
  })
}

function validateOrderInput(thisEvent, id, idErr){

  $(id).on(thisEvent, function(){
    var value = $(this).val().trim();
    $(id).val(value);

    if(!value)
      $(idErr).html('Cannot be empty').slideDown(500);
    else if(value.length <= 3)
      $(idErr).html('Min 3 characters').slideDown(500);
    else if(value.length > 30)
      $(idErr).html('Max 30 characters').slideDown(500);
    else
      $(idErr).html('').slideUp(500);
  })
}

function validateOrderButtons(){

  validateOrderButton('#orderDate', '#errorOrderDepartureDate', 'Select date');
  validateOrderButton('#paymentTypeButton', '#errorOrderPaymentType', 'Select payment');
}

function validateOrderButton(id, idErr, defaultValue){

  value = $(id).html();

  if(value == defaultValue)
    $(idErr).html('Cannot be default').slideDown(500);
  else
    $(idErr).html('').slideUp(500);
}
