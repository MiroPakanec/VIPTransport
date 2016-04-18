$(function(){

    getSession(function(data){

      if(data.email.length == 0){
          window.location="mainPage.html";
      }

      if(data.type == 'customer'){

        //generate page for custoemr
        generateCustomerButtons();
        generateMessage(data.fname);
      }
    });

    $('.notificationAmmount').html('0');

    getNotificationsAmmount(function(data){

      $('.notificationAmmount').html(data);
    });
});



function generateMessage(name){

  $('#welcomeMessage').html('Welcome ' + name);
}
