$(function(){

    getSession(function(data){

      if(data.email.length == 0){
          window.location="mainPage.html";
      }

      if(data.type == 'customer')
        generateCustomerButtons();
      else if(data.type == 'manager')
        generateManagerButtons();
      else if(data.type == 'transporter'){

          generateTransporterButtons();
          $('#newOrderParagraph').hide();
          $('#checkTransportsParagraph').css({'margin-left': '25%'});
          $('#checkTransportsTitle').html('Check your routes');
      }



      generateMessage(data.fname);
    });

    loadNotificationsAmmount();
});



function generateMessage(name){

  $('#welcomeMessage').html('Welcome ' + name);
}
