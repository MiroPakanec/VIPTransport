$(function(){

    //hideElementsOnload();
    getSession(function(data){

      if(data.email.length == 0)
          window.location="mainPage.html";
      else if(data.type != 'manager')
          window.location="homePage.html";

      $('#type').val(data.type);
    }),


    setTimeout(function() {

      load();
    },100);
});

function load(){

  loadButtons();
  //setDefaults();
  loadNotificationsAmmount();
  loadCars();
  //search();
}

function loadButtons(){

  var type = $('#type').val();
  if(type == 'customer')
    window.location="homePage.html";
  else if(type == 'manager')
    generateManagerButtons();
}

function loadCars(){
  
  getCars(function(data){
    console.log(data);
    alert(' got cars ');
  }, '');
}
