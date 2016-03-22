$(function(){

    getSession(function(data){

      if(data.email.length == 0){
          //window.location="mainPage.html";
      }

      //if(data.type == 'customer'){

        //generate page for custoemr
        generateCustomerButtons();
      //}
    }),

    $('.paymentSelection').hide(0);
    $('#datepickerMain').hide();
})

function generateCustomerButtons(){

  var html = '<a href="homePage.html"><input type="button" class="headerButton buttonHome smallText" value="Home"></a>'
            +'<a href="newOrderPage.html"><input type="button" class="headerButton buttonHome smallText" value="New Order"></a>'
            +'<a href="#"><input type="button" class="headerButton buttonHome smallText" value="My Orders"></a>'
            +'<a href="#"><input type="button" class="headerButton buttonHome smallText" value="My Profile"></a>'
            +'<a href="#"><input type="button" class="headerButton buttonHome smallText" value="About Us"></a>'
            +'<a href="#"><input type="button" class="headerButton buttonHome smallText" style="border-right: 0px" value="Log Out"></a>';

  $('.headerButtonsContainer').html(html);
}
