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
  if(type == 'customer')
    generateCustomerButtons();
  else if(type == 'manager')
    generateManagerButtons();
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
}

function loadDatePicker(){

  $(".datePickerArea").datepicker({
          inline: true,
          showOtherMonths: true,
          dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          dateFormat: "dd/mm/yy",
          minDate: '+1D',
          maxDate: '+6M',
          onSelect: function (date) {

              manageSearchDate(date);
          }
  });
}
