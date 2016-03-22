$(function(){

    getSession(function(data){

      if(data.email.length == 0){
          window.location="mainPage.html";
      }

      if(data.type == 'customer'){

        //generate page for custoemr
        generateCustomerButtons();
      }
    }),

    $('.paymentSelection').hide(0);
    $('#datepickerMain').hide();
    $('.errorMessage').hide();
    $('#orderClock').val('AM');

})

//form submit
$(function(){

    $('#orderForm').on('submit', function(e){

      e.preventDefault();

      if(validateOrderConfirm().length > 0)
        return;

      var url = $(this).attr('action');
      var type = $(this).attr('method');
      var data = {};
      $('input[name^="order"]').each(function(index, value){

        var name = $(this).attr('name');
        var value = $(this).val();
        data[name] = value;
      }),
      $('div[name^="order"]').each(function(index, value){

        var name = $(this).attr('name');
        var value = $(this).html();
        data[name] = value;
      }),

      console.log(data)
    })
})

//on clear

$(function(){

  $('#orderClearButton').on('click', function(){

    $('#orderDate').html('Select date');
    $('#datepickerMain').slideUp(500);
    $('#orderTimeHour').val('');
    $('#orderTimeMinute').val('');
    $('#orderFrom').val('');
    $('#orderTo').val('');
    $('#paymentTypeButton').html('Select payment');
    $('#orderPasangers').html('2');

    $('.errorMessage').slideUp(500);
  })
})

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

  validateOrderTime('blur', '#orderTimeHour', '#errorOrderDepartureTime', /^[0-9+]*$/, 12, 0, 'hour');
  validateOrderTime('blur', '#orderTimeMinute', '#errorOrderDepartureTime', /^[0-9+]*$/, 59, 0, 'minute');
  validateOrderInput('blur', '#orderFrom', '#errorOrderFrom');
  validateOrderInput('blur', '#orderTo', '#errorOrderTo');
})


function validateOrderTime(thisEvent, id, idErr, regex, max, min, name){

  $(id).on(thisEvent, function(){
    var value = $(this).val();

    if(!value)
      $(idErr).html('Cannot be empty').slideDown(500);
    else if(value < min || value > max)
      $(idErr).html('Incorrect '+name+' (' + min + ' - ' + max + ')').slideDown(500);
    else if(!regex.test(value))
      $(idErr).html('Incorrect value').slideDown(500);
    else
      $(idErr).html('').slideUp(500);
  })
}

function validateOrderInput(thisEvent, id, idErr){

  $(id).on(thisEvent, function(){
    var value = $(this).val();

    if(!value)
      $(idErr).html('Cannot be empty').slideDown(500);
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

function generateCustomerButtons(){

  var html = '<a href="homePage.html"><input type="button" class="headerButton buttonHome smallText" value="Home"></a>'
            +'<a href="newOrderPage.html"><input type="button" class="headerButton buttonHome smallText" value="New Order"></a>'
            +'<a href="#"><input type="button" class="headerButton buttonHome smallText" value="My Orders"></a>'
            +'<a href="#"><input type="button" class="headerButton buttonHome smallText" value="My Profile"></a>'
            +'<a href="#"><input type="button" class="headerButton buttonHome smallText" value="About Us"></a>'
            +'<a href="#"><input type="button" class="headerButton buttonHome smallText" style="border-right: 0px" value="Log Out"></a>';

  $('.headerButtonsContainer').html(html);
}
