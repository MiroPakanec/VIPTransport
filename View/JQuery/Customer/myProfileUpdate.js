$(function (){

  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  $('#personalConfirmButton').on('click', function(){

    var error = validateProfilePersonalConfirm();
    if(error.length > 0)
      return;

    var data = {};
    $('input.personal').each(function(index, value){

      var name = $(this).attr('name');
      var value = $(this).val();
      data[name] = value;
    }),

    console.log(data);

    $.ajax({
      url: '../../Server/Responses/updateProfile.php',
      type: 'POST',
      data: data,
      success: function(response){
        console.log(response);
        handleUpdateResponse(response);
      },
      error: function(){
        $('#registrationResponse').slideDown(500).html('We are sorry, something went wrong');
      }
    })
  })

  validateInput('blur', '#emailInput', '#emailError' , emailRegex, 'Incorrect email',0 );
  validateInput('blur','#fnameInput', '#fnameError' , /^[a-zA-Z]*$/, 'Use only characters', 3 );
  validateInput('blur', '#mnameInput', '#mnameError' , /^[a-zA-Z]*$/, 'Use only characters', 1 );
  validateInput('blur', '#lnameInput', '#lnameError' , /^[a-zA-Z]*$/, 'Use only characters', 3 );
  validateInput('blur', '#phoneInput', '#phoneError' , /^[0-9+]*$/, 'Use only digit and "+"',6 );


})

function handleUpdateResponse(response){

  id = '#outputAreaPersonalForm';
  var responseText = '';
  if(response == 1){

      
      responseText = "Your profile was changed successfully.";
      positiveResponse(responseText, id);
  }
  else{

    responseText = "We are sorry, your profile could not be updated.";
    negativeResponse(responseText, id);
  }
}

function validateInput(thisEvent, id, idErr, regex, customeMessage, min){

  $(id).on(thisEvent, function(){
    var value = $(this).val();

    if(!value && !$(idErr).hasClass('canSkip')){
      $(idErr).html('Cannot be empty').slideDown(500);
    }
    else if(!regex.test(value)){
      $(idErr).html(customeMessage).slideDown(500);
    }
    else if(value.length < min && !$(idErr).hasClass('canSkip')){
      $(idErr).html('Minimum ' + min + ' characters').slideDown(500);
    }
    else{
      $(idErr).html('').slideUp(500);
    }
  });
}

function validateProfilePersonalConfirm(){

    var error = '';
    $(".errorMessage").each(function(){

      error =  error + $(this).html();
      if($(this).html().length > 0)
        $(this).toggle( "pulsate", 100).toggle( "pulsate", 100);
    });

    return error;
}
