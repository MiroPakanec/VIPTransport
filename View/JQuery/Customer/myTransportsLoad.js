$(function(){

    hideElementsOnload();
    loadDatePicker();

    getSession(function(data){

      if(data.email.length == 0){
          window.location="mainPage.html";
      }

      $('#type').val(data.type);
    }),


    setTimeout(function() {

        loadButtons();
        loadSearchBar();
        loadNotificationsAmmount();
        $("#titleOrder").trigger('click');
    },10);
});

function loadButtons(){

  var type = $('#type').val();
  if(type == 'customer'){

     generateCustomerButtons();
     $('#titleOrder').show().css({'margin-left' : '15%'});
     $('#titleTransport').show();
  }
  else if(type == 'manager'){

    generateManagerButtons();
    $('#titleOrder').show();
    $('#titleRoutes').show();
    $('#titleTransport').show();
  }
  else if(type == 'transporter'){

    alert();
    generateTransporterButtons();
    $('#titleRoutes').show().css({'margin-left' : '30%'});
  }
  else{

    window.location="mainPage.html";
  }


}

function loadSearchBar(){

  var type = $('#type').val();

  if(type == 'manager')
    $('.orderSearchBarArea').slideDown(800);
}

function hideElementsOnload(){

  $('.orderSearchBarArea').hide();
  $('#responseArea').hide();
  $('.datePickerArea').hide();
  $('.confirmArea').hide();
  $('.confirmError').hide();
  $('.confirmFormArea').hide();
  $('.title').hide();
}

function loadDatePicker(){

  $(".datePickerArea").datepicker({
          inline: true,
          showOtherMonths: true,
          dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          dateFormat: "dd/mm/yy",
          onSelect: function (date) {

              manageSearchDate(date);
          }
  });
}
