$(function(){

    getSession(function(data){

      if(data.email.length == 0)
        window.location="mainPage.html";


      if(data.type == 'customer')
        generateCustomerButtons();
      else if(data.type == 'manager')
        generateManagerButtons();

    }),

    loadNotificationsAmmount();

    setTimeout(function() {
      $('#menuVIPTransport').trigger('click');
    },10);

});
