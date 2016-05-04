$(function(){

  $('#notifications').on('click', function(){
    window.location="notificationsPage.html";
  });

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

    $('#registerCancelButton').trigger('click');
    var responseText =  '<p>How would you like to change ' + fname + ' ' + lname + "'s type?</p>" +
                        '<input type="button" id="customerType" class ="alertButton confirmType" value="Customer">' +
                        '<input type="button" id="transporterType" class ="alertButton confirmType" value="Transporter">' +
                        '<input type="button" id="managerType" class ="alertButton confirmType" value="Manager">' +
                        '<input type="button" id="cancelButton" class ="alertButton" value="Cancel">' +
                        '<input type="hidden" id="userEmail" value="' + email + '">';

    $('#responseArea').delay(500).html(responseText).css({
      'background-color' : 'rgba(255,255,255,0.1)',
      'border-color' : 'rgba(255,255,255,0.3)',
      'color' : 'white'
    }).slideDown(500);

  });

  $(document).on('click', '#cancelButton', function(){

    $('#responseArea').html('').slideUp(300);
  });

  $(document).on('click', '#newUserButton', function(){

    $('.employeesTableArea').css({'height' : '4.9%'});
    $('#formArea').css({'height' : '40%'});
    $('#registerForm').delay(300).fadeIn(500);
    $('#responseArea').html('').slideUp(200);
    $('#generatePasswordButton').trigger('click');
    $('#registerCustomerButton').trigger('click');

  });

  $(document).on('click', '.registerTypeButton', function(){

    var type = $(this).val().toLowerCase();

    $('.registerTypeButton').css({'background-color' : 'rgba(255,255,255,0)'});
    $(this).css({'background-color' : 'rgba(255,255,255,0.2)'})
    $('#registerType').val(type);
  });

  $(document).on('click', '#generatePasswordButton', function(){

    var password = "";
    var possibleChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var possibleDigit = "0123456789";

    for( var i=0; i < 5; i++ ){

      password += possibleChar.charAt(Math.floor(Math.random() * possibleChar.length));
      password += possibleDigit.charAt(Math.floor(Math.random() * possibleDigit.length));
    }

    $('#passwordInput').val(password);
  })

  $(document).on('click', '#registerCancelButton', function(){

    $('#registerForm').fadeOut(300);
    $('.rowError').each(function(){
      $(this).fadeOut(200);
    })
    setTimeout(function(){
        $('#formArea').css({'height' : '0%'});
        $('.employeesTableArea').delay(500).css({'height' : '40%'});
        $('.rowTextInput').each(function(){
          $(this).val('');
        });
    }, 300);
  });

  $(document).on('click', '#registerSubmitButton', function(){

    var errorCounter = 0;
    $('.rowTextInput').each(function(){

      errorCounter += validateInput($(this).val(), $(this).attr('id'));
    });

    if(errorCounter == 0)
      registerUser();
  });

  $(document).on('click', '.confirmType', function(){

    var value = $(this).val().toLowerCase();
    var email = $('#userEmail').val();

    updateUserType(function(data){

      handleUpdateResponse(data);
    }, email, value);
  });

  //blurs
  $('.rowTextInput').on('blur', function(){


    var value = $(this).val().trim();
    $(this).val(value);
    var id = $(this).attr('id');
    validateInput(value, id);
  })

});

function handleUpdateResponse(response){

  if(response == 1){

      $('#responseArea').html('User was successfully updated.').css({
        'background-color' : 'rgba(0,255,0,0.1)',
        'border-color' : 'rgba(0,255,0,0.4)',
        'color' : 'green'
      });
      search();
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

function handleRegistrationResponse(response){

  $('#registerCancelButton').trigger('click');

  if(response === 'Registration successful'){

    $('#responseArea').html('User was successfully registered.').css({
      'background-color' : 'rgba(0,255,0,0.1)',
      'border-color' : 'rgba(0,255,0,0.4)',
      'color' : 'green'
    }).delay(800).slideDown(500);
    delaySlideUp('#responseArea', 6000);
    setTimeout(function(){
      search();
    }, 500);
  }
  else{

    $('#responseArea').html('User could not be registered.').css({
      'background-color' : 'rgba(255,0,0,0.1)',
      'border-color' : 'rgba(255,0,0,0.1)',
      'color' : 'red'
    }).delay(800).slideDown(500);;
    delaySlideUp('#responseArea', 6000);
  }
}

function registerUser(){

  var data = {};
  $('.rowTextInput').each(function(){

    var name = $(this).attr('name');
    var value = $(this).val();
    data[name] = value;
  });

  data['type'] = $('#registerType').val();

  registerUserRequest(function(response){

    handleRegistrationResponse(response);
  }, data);
}

function validateInput(value, id){

  var name = id.slice(0,-5);
  var regex = getRegex(name);

  if(value.length <= 0 && name != 'mname' )
    $('#' + name + 'Err').slideDown(500);
  else if(value.length <= 3 && value.length > 0)
    $('#' + name + 'Err').slideDown(500);
  else if(value.length > 50)
    $('#' + name + 'Err').slideDown(500);
  else if(!regex.test(value))
    $('#' + name + 'Err').slideDown(500);
  else{

    $('#' + name + 'Err').slideUp(300);
    return 0;
  }

  return 1;
}

function getRegex(name){

  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  switch(name){
    case 'email': return emailRegex;
    case 'phone': return /^[0-9+]*$/;
    case 'password': return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/;
    case 'fname' : return /^[a-zA-Z]*$/;
    case 'mname' : return /^[a-zA-Z]*$/;
    case 'lname' : return /^[a-zA-Z]*$/;
  }

  return 0;
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
