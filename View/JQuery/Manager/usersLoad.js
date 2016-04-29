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

      employeesLoad();
    },100);
});

function employeesLoad(){

  loadButtons();
  setDefaults();
  loadNotificationsAmmount();
  search();
}

function loadButtons(){

  var type = $('#type').val();
  if(type == 'customer')
    window.location="homePage.html";
  else if(type == 'manager')
    generateManagerButtons();
}

function generateTableEmployees(){

  var html = '<table class="smallText" id="employeesTable">' +
                '<tr class = "tableHeader">' +
                  '<td>Email</td>' +
                  '<td>First name</td>' +
                  '<td>Last name</td>' +
                  //'<td>Type</td>' +
                  '<td>Phone</td>' +
                  '<td class="buttonColumnHeader"></td>' +
                  '<td class="buttonColumnHeader"></td>' +
                '</tr>';

   $('#employeesTableArea').html(html);
}

function generateTableRow(emial, fname, lname, type, phone){

  var html =  '<tr class = "tableRow" id="'+emial+'">' +
                '<td><input type="text" class="tableInput" name="email" value="'+ emial +'" disabled></td>' +
                '<td><input type="text" class="tableInput" name="fname" value="'+ fname +'" disabled></td>' +
                '<td><input type="text" class="tableInput" name="lname" value="'+ lname +'" disabled></td>' +
                '<td class="test"><input type="text" class="tableInput" name="phone" value="'+ phone +'" disabled></td>' +
                //'<td><input type="text" class="tableInput" name="type" value="'+ type +'" disabled></td>' +
                '<td class="buttonColumn changeButton">'+ 'Change type' +'</td>' +
              '</tr>';

  $('#employeesTable').append(html);
}

function setDefaults(){

  $('#customersButton').css({'background-color' : 'rgba(255,255,255,0.2)'});
  $('.employeeSearchBarArea').slideDown(500);
}

function hideElementsOnload(){

  $('.employeeSearchBarArea').hide();
  $('#responseArea').hide();
}
