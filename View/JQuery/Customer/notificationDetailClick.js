$(function (){

  $('#notifications').on('click', function(){
    window.location="notificationsPage.html";
  });

  $('#backButton').on('click', function(){
    window.location="notificationsPage.html";
  });

  $(document).on('click','#updateButton',function(){

    var id = getParameterByName('id');
    window.location = "newOrderPage.html?update=1&id="+id;
  });

  $(document).on('click','#deleteButton',function(){

    generetaOutputAreaDeleteConrifmartion();
    $('.outputArea').slideDown(500);
  });

  $(document).on('click', '#denyDeleteButton', function(){

    $('.outputArea').html('').slideUp(500);
  });

  $(document).on('click', '#confirDeletemButton', function(){

    deleteOrder(function(data){

        if(data == 1)
          success();
        else
          fail();
    },getParameterByName('id'));
  })

})

function generetaOutputAreaDeleteConrifmartion(){

  var html =  '<p class="smallText outputAreaElement">Are you sure you want to delete this order?</p>' +
              '<input type="button" class="buttonHome notificationButton buttonText" id="confirDeletemButton" value="Yes">' +
              '<input type="button" class="buttonHome notificationButton buttonText" id="denyDeleteButton" value="No">';

  $('.outputArea').html(html);
}

function success(){

  var html =  '<p class="smallText outputAreaElement">Order was successfully deleted</p>';

  $('.outputArea').html(html).css({
    'background-color' : 'rgba(0,255,0,0.1)',
    'border' : '1px solid rgba(0,255,0,0.3)'
  });

  $('.outputAreaElement').css({
    'color' : 'green'
  })

  setTimeout(function() {
      $('.outputArea').slideUp(500);
  },5000);
}

function fail(){

  var html =  '<p class="smallText outputAreaElement">Order could not be deleted</p>';

  $('.outputArea').html(html).css({
    'background-color' : 'rgba(255,0,0,0.1)',
    'border' : '1px solid rgba(255,0,0,0.3)'
  });

  $('.outputAreaElement').css({
    'color' : 'red'
  })

  setTimeout(function() {
      $('.outputArea').slideUp(500);
  },5000);
}
