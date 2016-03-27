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

    setTimeout(function() {
      $('#menuVIPTransport').trigger('click');
    },10);

});
