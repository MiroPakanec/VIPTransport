$(function() {

  menuButtons();

  $('#notifications').on('click', function(){
    window.location="notificationsPage.html";
  })

  $('#menuVIPTransport').on('click', function(){

    $('#textArea').html(getHtmlVIPTransport());
    loadPicture("../Css/Images/AboutUs/VIPTransport.jpg");
  })


  $('#menuTransporters').on('click', function(){

    $('#textArea').html(getHtmlTransporters());
    loadPicture("../Css/Images/AboutUs/Transporters.jpg");
  })

  $('#menuCars').on('click', function(){

    $('#textArea').html(getHtmlCars());
    loadPicture("../Css/Images/AboutUs/Cars.jpg");
  })

  $('#menuPriceList').on('click', function(){

    loadPicture('');
    $('#textArea').hide();
    generateTable();
  })

  $('#menuContact').on('click', function(){

    $('#textArea').html(getHtmlContact());
    loadPicture("");
  })
})

function generateTable(){

  var html = '<table class="smallText">' +
              '<tr class="headerRow">' +
                '<td rowspan="2">From</td>' +
                '<td rowspan="2">To</td>' +
                '<td colspan="2">Price</td>' +
              '</tr>'+
              '<tr class="headerRow">' +
                '<td>5 seats</td>' +
                '<td>8 seats</td>' +
              '</tr>'+
              '<tr>' +
                '<td>Zilina</td>' +
                '<td>Vienna airport</td>' +
                '<td>130 EUR</td>' +
                '<td>180 EUR</td>' +
              '</tr>'+
              '<tr>' +
                '<td>Zilina</td>' +
                '<td>Vienna centrum</td>' +
                '<td>150 EUR</td>' +
                '<td>200 EUR</td>' +
              '</tr>'+
              '<tr>' +
                '<td>Zilina</td>' +
                '<td>Praha airport</td>' +
                '<td>200 EUR</td>' +
                '<td>250 EUR</td>' +
              '</tr>'+
              '<tr>' +
                '<td>Zilina</td>' +
                '<td>Bratislava</td>' +
                '<td>120 EUR</td>' +
                '<td>160 EUR</td>' +
              '</tr>'+
              '<tr>' +
                '<td>Zilina</td>' +
                '<td>Frydel Mistek</td>' +
                '<td>75 EUR</td>' +
                '<td>110 EUR</td>' +
              '</tr>'+
              '<tr>' +
                '<td>Zilina</td>' +
                '<td>Nosovice</td>' +
                '<td>75 EUR</td>' +
                '<td>110 EUR</td>' +
              '</tr>'+
              '<tr>' +
                '<td>Zilina</td>' +
                '<td>Ostrava</td>' +
                '<td>85 EUR</td>' +
                '<td>117 EUR</td>' +
              '</tr>'+
              '<tr>' +
                '<td>Transporters service</td>' +
                '<td></td>' +
                '<td colspan="2">7 EUR/ hour</td>' +
              '</tr>'+
              '<tr>' +
                '<td>Waiting time</td>' +
                '<td></td>' +
                '<td colspan="2">5 EUR/ hour</td>' +
              '</tr>'+
            '</table>';

  $('#pictureArea').html(html);
}

function loadPicture(url){

  $('#textArea').show();
  $('#pictureArea').html('');
  $('#pictureArea').hide();
  $('#pictureArea').fadeIn(500);

  if(url.length > 0){

    $('#pictureArea').css({
    'background-image' : 'url(' + url + ')'
    });
    $('#pictureArea').addClass('aboutUsPicture');

  }
  else
    $('#pictureArea').css({
        'background-image' : 'none',
        'background-color' : 'rgba(255,255,255,0)'
    })
}

function getHtmlVIPTransport(){

  var html = "Spoločnosť VIP transport môžete využiť vždy, keď sa potrebujete prepraviť či už v rámci Slovenska alebo do zahraničia," +
    "ale taktiež na transfery na letiská (Žilina – letisko Viedeň, Žilina – letisko Praha,...). Vďaka tejto službe je zákazník odbremenený" +
    "od starostí pri zanechaní auta na letisko, pri hľadaní alternatívneho odvozu, ale taktiež redukuje svoje náklady (napríklad na parkovanie).";

  return html;
}

function getHtmlTransporters(){

  var html = "Profesionálni vodiči spoločnosti sa dokážu prispôsobiť všetkým požiadavkam klienta. Samozrejmosťou je dres code všetkých"+
    "šoférov, ktorý tvoria čierne nohavice a košela, v prípade požiadavky majú oblečený oblek. Každý zo šoférov ovláda"+
    "minimálne základy anglického jazyka slovom. Taktiež všetky náležitosti vodiča ako sú psychotesty resp."+
    "preukaz vodiča sú samozrejmosťou.";

  return html;
}

function getHtmlCars(){

  var html = "Spoločnosť disponuje 5 a 8-miestymi vozidlami, takže dokáže ponúknuť najvyššie pohodlie aj v prípade prepravy"+
    "väčšieho počtu osôb. Všetky autá sú v najlepšej výbave, preto poskytujú zákazníkovi maximálny komfort."+
    "Všetky autá sú neustále servisované, v dokonalom technickom stave.";

  return html;
}

function getHtmlContact(){

  var html = '<p class="largeText">VIP transport s.r.o.</p><br>' +
             "Address: Gemerská 4, 01008, Žilina <br>" +
             "IČO: 46304959<br>" +
             "DIČ: 2023323511<br>" +
             "Mail: info@viptransport.sk<br>" +
             "Phone: +421 911 301 111";

  return html;
}

function menuButtons(){
  $('.mainMenuElement').on('click', function(){

    $('.mainMenuElement').each(function(){
      $(this).css({
        'background-color' : 'rgba(255,255,255,0.1)'
      }).mouseover(function(){
        $(this).css({
          'background-color' : 'rgba(255,255,255,0.2)',
          'transition': 'background-color 0.5s ease'
        })
      }).mouseout(function(){
        $(this).css({
          'background-color' : 'rgba(255,255,255,0.1)'
        })
      })
    });

    $(this).css({
      'background-color' : 'rgba(255,255,255,0.3)',
      'transition': 'background-color 0.8s ease'
    }).mouseover(function(){
      $(this).css({
        'background-color' : 'rgba(255,255,255,0.3)'
      })
    }).mouseout(function(){
      $(this).css({
        'background-color' : 'rgba(255,255,255,0.3)'
      })
    })
})
}
