$(function(){

    getSession(function(data){

      if(data.email.length == 0){
          //window.location="mainPage.html";
      }

      if(data.type == 'customer'){

        //generate page for custoemr
        generateCustomerButtons();
      }
    });
})

function generateCustomerButtons(){

  var html = '<input type="button" class="headerButton button smallText" value="Home">'
            +'<input type="button" class="headerButton button smallText" value="New Order">'
            +'<input type="button" class="headerButton button smallText" value="My Orders">'
            +'<input type="button" class="headerButton button smallText" value="My Profile">'
            +'<input type="button" class="headerButton button smallText" style="border-right: 0px" value="Log Out">';

  $('.headerButtonsContainer').html(html);

}
