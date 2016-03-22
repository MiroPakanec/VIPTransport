
$(function(){

    getSession(function(data){

      if(data.email.length > 0){
        window.location="homePage.html";
      }

      //set token
      $('input[name^="token"]').each(function(){
        $(this).val(data.token);
      })
    });
})

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

//on load set content
$(function() {

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


  $('.errorMessage').hide();
  $('.mainResponseRow').hide();

});
