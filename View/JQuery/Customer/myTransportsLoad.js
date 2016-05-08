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
        loadNotificationsAmmount();
    },10);
});

function loadButtons(){

  var type = $('#type').val();
  if(type == 'customer'){

     generateCustomerButtons();
     $('#titleOrder').show().css({'margin-left' : '15%'});
     $('#titleTransport').show();
     $("#titleOrder").trigger('click');
  }
  else if(type == 'manager'){

    generateManagerButtons();
    $('#titleOrder').show();
    $('#titleRoutes').show();
    $('#titleTransport').show();
    loadSearchBar();
    $("#titleOrder").trigger('click');
  }
  else if(type == 'transporter'){

    generateTransporterButtons();
    $('#titleRoutes').show().css({'margin-left' : '30%'});
    $("#titleRoutes").trigger('click');
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
