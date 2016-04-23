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

   loadNotificationsAmmount();

    $('#responseArea').hide();
    setTimeout(function() {
        $("#titleOrder").trigger('click');
    },10);
})
