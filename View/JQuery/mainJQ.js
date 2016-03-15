
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

  $('#orderPasangers').val(2);
});

//order
$(function(){

    var timeButton = 'AM';

    //remove text on click / add default text back if empty
    $("input[id*='orderDate'], input[id*='orderTime']").focus(function(){
      var curVal = $(this).val();
      if(curVal == 'DD' || curVal == 'MM' || curVal == 'YYYY' || curVal == 'Hour' || curVal == 'Minute')
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

    $("#orderPasangers").blur(function(){
      validateNumber(this, $(this).val());
    }),

    //plus minut buttons
    $("#plusButton").on('click', function(){
      var value = $('#orderPasangers').val();
      if($.isNumeric(value)){
          if(value < 9)
            value ++;
          $('#orderPasangers').val(value);
      }
      else{
        $('#orderPasangers').val('');
      }
    }),

    $("#minusButton").on('click', function(){
      var value = $('#orderPasangers').val();
      if($.isNumeric(value)){
        if(value > 1)
          value --;
        $('#orderPasangers').val(value);
      }
      else{
        $('#orderPasangers').val('');
      }
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
      $('#orderDateDay').val('DD').css({'color' : 'black'});
      $('#orderDateMonth').val('MM').css({'color' : 'black'});
      $('#orderDateYear').val('YYYY').css({'color' : 'black'});
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
      $('#orderPasangers').val('2').css({'color' : 'black'});
    })
});

//validate functions
//validate if date is recent
function validateDate(input){

  var day = $('#orderDateDay').val();
  var month = $('#orderDateMonth').val();
  var year = $('#orderDateYear').val();

  if(wasInputed(day) && wasInputed(month) && wasInputed(year)){

    month -=1;
    var date = new Date();
    date.setFullYear(year, month, day);
    var curDate = new Date();

    if( date < curDate) {
      setTextColor('#orderDateDay', 'red');
      setTextColor('#orderDateMonth', 'red');
      setTextColor('#orderDateYear', 'red');
    }
    else{
      setTextColor('#orderDateDay', 'red');
      setTextColor('#orderDateMonth', 'red');
      setTextColor('#orderDateYear', 'red');    }
  }
}

function wasInputed(value){

  if(value.length > 0){
    if(value != 'DD' && value != 'MM' && value != 'YYYY')
      return true;
    else
      return false;
  }

  return false;
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

  var date = new Date();
  var year = date.getFullYear();

  if($(element).attr('id')=='orderDateDay' && input > 31)
    setTextColor(element, 'red');

  if($(element).attr('id')=='orderDateMonth' && input > 12)
    setTextColor(element, 'red');

  if($(element).attr('id')=='orderDateYear' && input > year + 1)
      setTextColor(element, 'red');

  if($(element).attr('id')=='orderTimeHour' && input > 12)
      setTextColor(element, 'red');

  if($(element).attr('id')=='orderTimeMinute' && input > 60)
          setTextColor(element, 'red');
}

function validateNatural(element, input){

  if(input.indexOf('.') >= 0)
    setTextColor(element, 'red');
}

function setTextColor(element, color){
  $(element).css({
  'color' : color
  });
}

function setDefaultText(element){
  switch($(element).attr("id")){

    case 'orderTimeHour':{$('#orderTimeHour').val('Hour'); break;}
    case 'orderTimeMinute':{$('#orderTimeMinute').val('Minute'); break;}
    case 'orderDateDay':{$('#orderDateDay').val('DD'); break;}
    case 'orderDateMonth':{$('#orderDateMonth').val('MM'); break;}
    case 'orderDateYear':{$('#orderDateYear').val('YYYY'); break;}
  }
}
