$(function(){

  hideElementsOnload();
  getSession(function(data){

    $('#type').val(data.type);
  });

  setTimeout(function() {

    load();
  },50);
});

function hideElementsOnload(){

  $('.subSelectionInputArea').hide();
  $('.companySubSelectionArea').hide();
}

function load(){

  loadButtons();
  loadNotificationsAmmount();
  loadSelectionArea();
  loadDatePickers();
}

function loadButtons(){

  var type = $('#type').val();
  if(type == 'customer')
    window.location="homePage.html";
  else if(type == 'manager')
    generateManagerButtons();
  else if(type == 'transporter'){
    window.location="homePage.html";
  }
}

function loadSelectionArea(){

  $('#mainIncome').trigger('click');
}

function loadDatePickers(){

  $("#datePickerAreaFrom").datepicker({
          inline: true,
          showOtherMonths: true,
          dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          dateFormat: "yy-mm-dd",
          onSelect: function (date) {
                  $('#dateFromButton').val(date);
                  $('#datePickerAreaFrom').slideToggle(500);
                  loadStatistics();
              }
  });

  $("#datePickerAreaTo").datepicker({
          inline: true,
          showOtherMonths: true,
          dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          dateFormat: "yy-mm-dd",
          onSelect: function (date) {
                  $('#dateToButton').val(date);
                  $('#datePickerAreaTo').slideToggle(500);
                  loadStatistics();
              }
  });

  $("#datePickerAreaTo").hide();
  $("#datePickerAreaFrom").hide();
}
