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

    setTimeout(function() {
      $('#menuVIPTransport').trigger('click');
    },10);

});
