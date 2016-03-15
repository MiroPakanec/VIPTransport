
//check session
$(function(){
  //get session
    $.ajax({
        type: 'GET',
        url: '../../Server/Responses/getSession.php',
        data: '',
        success: function(msg){
            checkSession(msg);
        }
    });
});

//js function, checks result of get session
function checkSession(msg){

  if(msg === 'in'){
    window.location="home.html";
  }
}

//hover
$(function() {
  $( ".mainMenuElement" ).mouseover(function() {
      $(this).css({
        'background-color' : 'rgba(255,255,255,0.1)',
        "transition":"background-color 0.5s ease"
      });
  });

  $( ".mainMenuElement" ).mouseout(function() {
      $(this).css({
        'background-color' : 'rgba(255,255,255,0.0)',
        "transition":"background-color 0.8s ease"
      });
  });
});

//set content
$(function() {

  $('.paymentSelection').hide(0),

  $('#parAboutUs').html("Spoločnosť VIP transport môžete využiť vždy, keď sa potrebujete prepraviť či už v rámci Slovenska alebo do zahraničia," +
    "ale taktiež na transfery na letiská (Žilina – letisko Viedeň, Žilina – letisko Praha,...). Vďaka tejto službe je zákazník odbremenený" +
    "od starostí pri zanechaní auta na letisko, pri hľadaní alternatívneho odvozu, ale taktiež redukuje svoje náklady (napríklad na parkovanie)."),

  $('#parTransporters').html("Profesionálni vodiči spoločnosti sa dokážu prispôsobiť všetkým požiadavkam klienta. Samozrejmosťou je dres code všetkých"+
    "šoférov, ktorý tvoria čierne nohavice a košela, v prípade požiadavky majú oblečený oblek. Každý zo šoférov ovláda"+
    "minimálne základy anglického jazyka slovom. Taktiež všetky náležitosti vodiča ako sú psychotesty resp."+
    "preukaz vodiča sú samozrejmosťou."),

  $('#parCars1').html("Spoločnosť disponuje 5 a 8-miestymi vozidlami, takže dokáže ponúknuť najvyššie pohodlie aj v prípade prepravy"+
    "väčšieho počtu osôb. Všetky autá sú v najlepšej výbave, preto poskytujú zákazníkovi maximálny komfort."+
    "Všetky autá sú neustále servisované, v dokonalom technickom stave."),

  $('#parCars2').html("Spoločnosť VIP transport s.r.o. má k dispozícií vozidlá značky Hyundai – i40 kombi, i40 sedan a H1. Všetky"+
    "vozidlá majú dostatočne veľký batožinový priestor, aby sa dokázali naplniť všetky požiadavky klienta aj v prípade"+
    "prepravy väčšieho množstva batožiny."),

  $('#datepickerMain').hide();
  $('.errorMessage').hide();

});

//order
$(function(){

    var timeButton = 'AM';
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    $('#orderDateButton').on('click', function(){
      $('#datepickerMain').slideToggle(500);
    }),

    $("#datepickerMain").datepicker({
            inline: true,
            showOtherMonths: true,
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dateFormat: "dd/mm/yy",
            minDate: '+1D',
            maxDate: '+6M',
            onSelect: function (date) {
                    $('#orderDate').html(date);
                  }
    }),

    //time check

    $("input[id*='orderTime']").focus(function(){
      var curVal = $(this).val();
      if(curVal == 'Hour' || curVal == 'Minute')
        $(this).val('');
    }).blur(function(){
      var input = $(this).val();
      if(!input.length > 0){
        setDefaultText(this);
        setTextColor(this, 'red');
      }
      else{
       //validate if input is correct number
       validateNumber(this, input);
     }
    }),

    //plus minut buttons
    $("#plusButton").on('click', function(){
      var value = $('#orderPasangers').html();
        if(value < 9)
          $('#orderPasangers').html(parseInt(value) + 1);
    }),

    $("#minusButton").on('click', function(){
      var value = $('#orderPasangers').html();
        if(value > 1)
          $('#orderPasangers').html(parseInt(value) - 1);
    }),

    $("#paymnetTypeButton").on('click', function(){
      $(this).appendTo('<input type="button" class="button" value="test"></input>');
    }),

    $("#paymentTypeButton, .paymentSelection").mouseover(function(){
      $('.paymentSelection').stop().slideDown(500);
    }),

    $("#paymentTypeButton, .paymentSelection").mouseout(function(){
      $('.paymentSelection').stop().slideUp(300);
    }),

    $(".paymentSelection").click(function(){
      var value = $(this).html();
      $('#paymentTypeButton').html(value);
    })

    //time AM/ PM
    $('#timeButtonAM').on('click', function(){
      timeButton = 'AM';
      $(this).css({
        'background-color' : 'rgba(255, 255, 255, 0.1)'
      });
      $('#timeButtonPM').css({
        'background-color' : 'rgba(255, 255, 255, 0.0)'
      });
    }),

    $('#timeButtonPM').on('click', function(){
      timeButton = 'PM';
      $(this).css({
        'background-color' : 'rgba(255, 255, 255, 0.1)'
      });
      $('#timeButtonAM').css({
        'background-color' : 'rgba(255, 255, 255, 0.0)'
      });
    }),

    $('#orderClearButton').on('click', function(){
      $('#orderUsername').val('').css({'color' : 'black'});
      $('#orderCompanyName').val('').css({'color' : 'black'});
      $('#paymentTypeButton').html('Select payment');
      $('#orderDate').html('Select date');
      $('#datepickerMain').slideUp(500);
      $('#orderTimeHour').val('Hour').css({'color' : 'black'});
      $('#orderTimeMinute').val('Minute').css({'color' : 'black'});
      $('#timeButtonAM').css({
        'background-color' : 'rgba(255, 255, 255, 0.1)'
      });
      $('#timeButtonPM').css({
        'background-color' : 'rgba(255, 255, 255, 0)'
      });
      timeButton = 'AM';
      $('#ordeFrom').val('').css({'color' : 'black'});
      $('#orderTo').val('').css({'color' : 'black'});
      $('#orderPasangers').html('2');
    }),

    validateRegistration('#registrationFirstName', '#errorRegistrationFirstName' , /^[a-zA-Z]*$/, 'Use only characters', 3, true );
    validateRegistration('#registrationMiddleName', '#errorRegistrationMiddleName' , /^[a-zA-Z]*$/, 'Use only characters', 1, false );
    validateRegistration('#registrationLastName', '#errorRegistrationLastName' , /^[a-zA-Z]*$/, 'Use only characters', 3, true );
    validateRegistration('#registrationUsername', '#errorRegistrationUsername' , /^[a-zA-Z0-9._-]*$/, 'Character not alowed',6, true );
    validateRegistration('#registrationPassword', '#errorRegistrationPassword' , /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/, 'Use character and digit',8, true );
    validateRegistration('#registrationEmail', '#errorRegistrationEmail' , emailRegex, 'Incorrect email',0, true );
    validateRegistration('#registrationPhone', '#errorRegistrationPhone' , /^[0-9+]*$/, 'Use only digit and "+"',6, true );

    //validate confirm password
    $('#registrationConfirmPassword').blur(function(){
      var value = $(this).val();
      if(!value)
        $('#errorRegistrationConfirmPassword').html('Cannot be empty').slideDown(500);
      else if(value != $('#registrationPassword').val()){
        $('#errorRegistrationConfirmPassword').html('Passwords have to match').slideDown(500);
      }
      else{
        $('#errorRegistrationConfirmPassword').html('').slideUp(500);
      }
    }),

    $('#registrationClearButton').on('click', function(){

      clearRegistrationErrors();
      clearRegistrationFields();
    })
});

function clearRegistrationFields(){

  $('#registrationFirstName').val('');
  $('#registrationMiddleName').val('');
  $('#registrationLastName').val('');
  $('#registrationUsername').val('');
  $('#registrationPassword').val('');
  $('#registrationConfirmPassword').val('');
  $('#registrationEmail').val('');
  $('#registrationPhone').val('');
}

function clearRegistrationErrors(){
  $('#errorRegistrationFirstName').html('').slideUp(500);
  $('#errorRegistrationMiddleName').html('').slideUp(500);
  $('#errorRegistrationLastName').html('').slideUp(500);
  $('#errorRegistrationUsername').html('').slideUp(500);
  $('#errorRegistrationPassword').html('').slideUp(500);
  $('#errorRegistrationConfirmPassword').html('').slideUp(500);
  $('#errorRegistrationEmail').html('').slideUp(500);
  $('#errorRegistrationPhone').html('').slideUp(500);
}

function validateRegistration(id, idErr, regex, customeMessage, min, mandatory){

  $(id).blur(function(){
    var value = $(this).val();

    if(!value && mandatory){
      $(idErr).html('Cannot be empty').slideDown(500);
    }
    else if(!regex.test(value)){
      $(idErr).html(customeMessage).slideDown(500);
    }
    else if(value.length < min && mandatory){
      $(idErr).html('Minimum ' + min + ' characters').slideDown(500);
    }
    else{
      $(idErr).html('').slideUp(500);
    }
  });
}

function setTextColor(element, color){
  $(element).css({
  'color' : color
  });
}

function setDefaultText(element){
  var id = $(element).attr("id");

  if(id == 'orderTimeHour')
    $('#'+id).val('Hour');
  else if(id == 'orderTimeMinute')
    $('#'+id).val('Minute');
}

//validate if number is corretly inputed
function validateNumber(element, input){
  if(!$.isNumeric(input))
    setTextColor(element, 'red');
  else{
    setTextColor(element, 'black');
    validateNegative(element, input);
    validateAmmout(element, input);
    validateNatural(element, input);
  }
}

//validate if input is negative
function validateNegative(element, input){

  if(input<0)
    setTextColor(element, 'red');
}

//validate if ammount is correct
function validateAmmout(element, input){

  if($(element).attr('id')=='orderTimeHour'){

      if(input > 12)
        setTextColor(element, 'red');

      //check time interval
      var d = new Date();
      var hour = d.getUTCHours() +1;
      validateTime(hour, input);
  }

  if($(element).attr('id')=='orderTimeMinute' && input > 60)
          setTextColor(element, 'red');
}

function validateTime(hour, input){

  if(hour > 20 && hour < 6){
    //if night time allow
  }
}

function validateNatural(element, input){

  if(input.indexOf('.') >= 0)
    setTextColor(element, 'red');
}
