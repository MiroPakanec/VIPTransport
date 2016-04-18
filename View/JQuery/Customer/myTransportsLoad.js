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

    $('.notificationAmmount').html('0');

    getNotificationsAmmount(function(data){

      $('.notificationAmmount').html(data);
    }),

    $('#responseArea').hide();
    setTimeout(function() {
        $("#titleOrder").trigger('click');
    },10);
})
