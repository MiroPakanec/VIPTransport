$(function(){

    getSessionData();

    hideElements();
    $('#formSelection').fadeIn(300);
    $('#profilePictureArea').fadeIn(300);
});

function getSessionData(){

  getSession(function(data){

    if(data.email.length == 0)
      window.location="mainPage.html";

    if(data.type == 'customer')
      generateCustomerButtons();
    else if(data.type == 'manager')
      generateManagerButtons();
    else if(data.type == 'transporter')
      generateTransporterButtons();

    getCompanyData(data.email);
    loadData(data);
    loadProfilePicture(data.email);
  }),

  loadNotificationsAmmount();
}

function getCompanyData(email){

   getCompany(function(data){

     if(!data.name.length == 0){

       $('#companyName').val(data.name);
       $('#invoiceAddress').val(data.address);
       $('#ico').val(data.ico);
       $('#dic').val(data.dic);
     }


   }, email);
}

function loadProfilePicture(email){

  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/getProfilePicture.php',
      data: 'email='+email,
      success: function(response){

        if(response.length > 23)
        $('#profilePicture').css({
          'background-image' : 'url(' + response + ')'
        })
        else
        $('#profilePicture').css({
          'background-image' : 'url(../Css/Images/ProfilePictures/profileDefault.png)'
        })
      }
  });
}

function hideElements(){

  $('#filePicker').hide();

  $('#profilePictureArea').hide();

  $('.formArea').each(function(){
      $(this).hide();
  })

  $('.outputArea').each(function(){
    $(this).hide();
  });

  $('.errorMessage').each(function(){
    $(this).hide();
  })

  $('.outputAreaForm').each(function(){
    $(this).hide();
  })
}

function loadData(data){

  $('#emailInput').val(data.email);
  $('#fnameInput').val(data.fname);
  $('#mnameInput').val(data.mname);
  $('#lnameInput').val(data.lname);
  $('#phoneInput').val(data.phone);
}
