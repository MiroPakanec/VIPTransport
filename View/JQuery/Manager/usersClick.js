$(function(){

  //manage type input
  $('.typeButton').on('click', function(){
    $('.typeButton').each(function(){
      $(this).css({'background-color' : 'rgba(255,255,255,0)'});
    });
    $(this).css({'background-color' : 'rgba(255,255,255,0.3)'});
    setTypeRequest($(this).val());
    search();
  });

  //manage text input
  $('#emailInput').on('keyup', function(){

    manageInput($(this).val(), /^[a-zA-Z0-9-_.@]*$/, $(this).attr('id'), '#emailRequest');
    $('#emailRequest').val($(this).val());
    search();
  });

  $('#fnameInput').on('keyup', function(){

    manageInput($(this).val(), /^[a-zA-Z]*$/, $(this).attr('id'), '#fnameRequest');
    $('#fnameRequest').val($(this).val());
    search();
  });

  $('#lnameInput').on('keyup', function(){

    manageInput($(this).val(), /^[a-zA-Z]*$/, $(this).attr('id'), '#lnameRequest');
    $('#lnameRequest').val($(this).val());
    search();
  });

  //clear button
  $('#clearButton').on('click', function(){

    $('.inputElement').each(function(){
      $(this).val('').css({'background-color' : 'rgba(255,255,255,0.2)'});
    });

    $('.request').each(function(){
      $(this).val('');
    });

    $('#typeRequest').val('customer');
    $('#customersButton').trigger('click');
    search();
  });

  //change type button
  $(document).on('click', '.changeButton', function(){

    var email = $(this).parent().attr('id');
    var fname = $(this).prev().prev().prev().find("input").val();
    var lname = $(this).prev().prev().find("input").val();

    var responseText =  '<p>How would you like to change ' + fname + ' ' + lname + "'s type?</p>" +
                        '<input type="button" id="customerType" class ="alertButton confirmType" value="Customer">' +
                        '<input type="button" id="transporterType" class ="alertButton confirmType" value="Transporter">' +
                        '<input type="button" id="managerType" class ="alertButton confirmType" value="Manager">' +
                        '<input type="button" id="cancelButton" class ="alertButton" value="Cancel">' +
                        '<input type="hidden" id="userEmail" value="' + email + '">';

    $('#responseArea').html(responseText).slideDown(500);

  });

  $(document).on('click', '#cancelButton', function(){

    $('#responseArea').html('').slideUp(300);
  });

  $(document).on('click', '.confirmType', function(){

    var value = $(this).val().toLowerCase();
    var email = $('#userEmail').val();

    updateUserType(function(data){

      handleUpdateResponse(data);
    }, email, value);
  });
});

function handleUpdateResponse(response){

  if(response == 1){

      $('#responseArea').html('User was successfully updated.').css({
        'background-color' : 'rgba(0,255,0,0.1)',
        'border-color' : 'rgba(0,255,0,0.4)',
        'color' : 'green'
      });
      delaySlideUp('#responseArea', 5000);
  }
  else if(response == 0){

    $('#responseArea').html('User could not be updated.').css({
      'background-color' : 'rgba(255,0,0,0.1)',
      'border-color' : 'rgba(255,0,0,0.1)',
      'color' : 'red'
    });
    delaySlideUp('#responseArea', 5000);
  }
}

function setTypeRequest(value){

  if(value === 'Managers')
    $('#typeRequest').val('manager');
  else if(value === 'Customers')
    $('#typeRequest').val('customer');
  else if(value === 'Transporters')
    $('#typeRequest').val('transporter');
}

function manageInput(value, emailRegex, elementId, requestId){

  var color = 'rgba(255,0,0,0.1)';

  if(!emailRegex.test(value))
    color = incorrectValue(requestId);

  else{

    color = 'rgba(255,255,255,0.2)';
    $(requestId).val(value);
  }

  $('#' + elementId).css({'background-color' : color});
  return value;
}

function incorrectValue(requestId){

  $(requestId).val('');
  return 'rgba(255,0,0,0.1)';
}

function search(){

  var type = $('#typeRequest').val();
  var email = $('#emailRequest').val();
  var fname = $('#fnameRequest').val();
  var lname = $('#lnameRequest').val();

  getEmployeess(function(data){

    $('#employeesTable').html('');
    generateTableEmployees();

      for (index in data){
        generateTableRow(data[index].email ,data[index].fname, data[index].lname, data[index].type, data[index].phone);
      }
  }, email, fname, lname, type);
}
