function generateCustomerButtons(){

  var html = '<a href="homePage.html"><input type="button" class="headerButton buttonHome smallText" value="Home"></a>'
            +'<a href="newOrderPage.html"><input type="button" class="headerButton buttonHome smallText" value="New Order"></a>'
            +'<a href="myTransportsPage.html"><input type="button" class="headerButton buttonHome smallText" value="My Transports"></a>'
            +'<a href="myProfile.html"><input type="button" class="headerButton buttonHome smallText" value="My Profile"></a>'
            +'<a href="AboutUsPage.html"><input type="button" class="headerButton buttonHome smallText" value="About Us"></a>'
            +'<a href="#"><input type="button" class="headerButton buttonHome smallText" id="logOutButton" style="border-right: 0px" value="Log Out"></a>';

  $('.headerButtonsContainer').html(html);
}

function generateManagerButtons(){

  var html = '<a href="homePage.html"><input type="button" class="headerButtonManager buttonHome smallText" value="Home"></a>'
            +'<a href="newOrderPage.html"><input type="button" class="headerButtonManager buttonHome smallText" value="New Order"></a>'
            +'<a href="myTransportsPage.html"><input type="button" class="headerButtonManager buttonHome smallText" value="Transports"></a>'
            +'<a href="#"><input type="button" class="headerButtonManager buttonHome smallText" value="Cars"></a>'
            +'<a href="#"><input type="button" class="headerButtonManager buttonHome smallText" value="Drivers"></a>'
            +'<a href="myProfile.html"><input type="button" class="headerButtonManager buttonHome smallText" value="My Profile"></a>'
            +'<a href="AboutUsPage.html"><input type="button" class="headerButtonManager buttonHome smallText" value="About Us"></a>'
            +'<a href="#"><input type="button" class="headerButtonManager buttonHome smallText" id="logOutButton" style="border-right: 0px" value="Log Out"></a>';

  $('.headerButtonsContainer').html(html);
}

$(function(){

  $(document).on('click','#logOutButton',function(){
    endSession(function(data){

        window.location="mainPage.html";
    });
  })
})
