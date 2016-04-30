$(function(){

    getSession(function(data){

      if(data.email.length == 0){
          window.location="mainPage.html";
      }

      if(data.type == 'customer')
        //generate page for custoemr
        generateCustomerButtons();
      else if(data.type == 'transporter')
        generateCustomerButtons();
      else if(data.type == 'manager')
        generateManagerButtons();


      generateMessage(data.fname);
    });

    loadNotificationsAmmount();
});



function generateMessage(name){

  $('#welcomeMessage').html('Welcome ' + name);
}
