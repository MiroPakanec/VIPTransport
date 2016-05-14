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
}

function load(){

  loadButtons();
  loadNotificationsAmmount();
  loadSelectionArea();
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
