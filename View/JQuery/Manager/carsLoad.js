$(function(){

    hideElementsOnload();
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

  generateTableHead();
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

function hideElementsOnload(){

  $('#responseArea').hide();
  $('#formArea').hide();

  $('.error').each(function(){
    $(this).hide();
  });
}

function loadCars(){

  getCars(function(data){

      for(index in data){

        generateTableRow(data[index].Spz ,data[index].Brand, data[index].Type, data[index].Seats,
          data[index].State);
      }
  }, '');
}

function generateTableHead(){

  var html = '<table class="smallText" id="carTable">' +
                '<tr class = "tableHeader">' +
                  '<td>Spz</td>' +
                  '<td>Brand</td>' +
                  '<td>Type</td>' +
                  '<td>Seats</td>' +
                  '<td>State</td>' +
                  '<td class="buttonColumnHeader"></td>' +
                  '<td class="buttonColumnHeader"></td>' +
                '</tr>';

   $('#carTableArea').html(html);
}

function generateTableRow(spz, brand, type, seats, state){

  var html =      '<tr class = "tableRow" id="'+spz+'">' +
                    '<td><input type="text" class="tableInput" name="spz" value="'+ spz +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="brand" value="'+ brand +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="type" value="'+ type +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="seats" value="'+ seats +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="state" value="'+ state +'" disabled></td>' +
                    '<td class="buttonColumn deleteButton">Delete</td>' +
                    '<td class="buttonColumn editButton">View/ Update</td>' +
                  '</tr>';

  $('#carTable').append(html);
}
