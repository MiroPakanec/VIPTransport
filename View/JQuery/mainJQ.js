
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
    "prepravy väčšieho množstva batožiny.")
});

//order
$(function(){

    $("#orderDateDay, #orderDateMonth, #orderDateYear,"+
    "#orderTimeHour , #orderTimeMinute").on('click', function(){
      $(this).val('');
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
});
