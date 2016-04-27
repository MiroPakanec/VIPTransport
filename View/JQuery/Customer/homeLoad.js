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
      else if(data.type == 'manager'){

        generateManagerButtons();
      }
    });

    loadNotificationsAmmount();
});



function generateMessage(name){

  $('#welcomeMessage').html('Welcome ' + name);
}
