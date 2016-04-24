$(function (){

  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  $('#personalConfirmButton').on('click', function(){

    profilePersonalConfirm();
  })

  $('#passwordConfirmButton').on('click', function(){

    profilePasswordConfirm();
  })

  $('#companyConfirmButton').on('click', function(){

    profileCompanyConfirm();
  })

  //personal form
  validateInput('blur', '#emailInput', '#emailError' , emailRegex, 'Incorrect email',0 ,'n' );
  validateInput('blur','#fnameInput', '#fnameError' , /^[a-zA-Z]*$/, 'Use only characters', 3,'n' );
  validateInput('blur', '#mnameInput', '#mnameError' , /^[a-zA-Z]*$/, 'Use only characters', 1 ,'n' );
  validateInput('blur', '#lnameInput', '#lnameError' , /^[a-zA-Z]*$/, 'Use only characters', 3 ,'n' );
  validateInput('blur', '#phoneInput', '#phoneError' , /^[0-9+]*$/, 'Use only digit and "+"',6 ,'n' );

  //password form
  validateInput('blur', '#currentPassword', '#currentPasswordError' , /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/, 'Use character and digit',8 ,'n' );
  validateInput('blur', '#newPassword', '#newPasswordError' , /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/, 'Use character and digit',8 ,'n' );
  validatePasswordMatch('blur', '#newPasswordRepeat', '#newPassword', '#newPasswordRepeatError');

  //company form
  validateInput('blur', '#companyName', '#companyNameError' , /^[a-zA-Z\s]*$/, 'Use only characters',3  ,'n');
  validateInput('blur', '#invoiceAddress', '#invoiceAddressError' , /^/, 'Use only characters or numbers',6 ,'n');
  validateInput('blur', '#ico', '#icoError' , /^[0-9]*$/, 'Use only numbers',8, 8);
  validateInput('blur', '#dic', '#dicError' , /^[0-9]*$/, 'Use only numbers',10, 10);


})

function handleUpdateResponse(response, id){

  id = '#'+id;
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

function validateInput(thisEvent, id, idErr, regex, customeMessage, min, max){

  $(id).on(thisEvent, function(){
    var value = $(this).val().trim();
    $(id).val(value);

    if(!value && !$(idErr).hasClass('canSkip')){
      $(idErr).html('Cannot be empty').slideDown(500);
    }
    else if(!regex.test(value)){
      $(idErr).html(customeMessage).slideDown(500);
    }
    else if(value.length < min && !$(idErr).hasClass('canSkip')){
      $(idErr).html('Minimum ' + min + ' characters').slideDown(500);
    }
    else if(max != 'n' && value.length > max && !$(idErr).hasClass('canSkip')){
        $(idErr).html('Maximum ' + max + ' characters').slideDown(500);
    }
    else{
      $(idErr).html('').slideUp(500);
    }
  });
}

function validatePasswordMatch(thisEvent, id, matchId, idErr){

  $(id).blur(function(){
    var value = $(this).val();
    if(!value)
      $(idErr).html('Cannot be empty').slideDown(500);
    else if(value != $(matchId).val()){
      $(idErr).html('Passwords have to match').slideDown(500);
    }
    else{
      $(idErr).html('').slideUp(500);
    }
  })
}

function profilePersonalConfirm(){

  var error = validateProfilePersonalConfirm();
  if(error.length > 0)
    return;

  request('../../Server/Responses/updateProfile.php' ,'POST' ,'input.personal', 'outputAreaPersonalForm');
}

function profilePasswordConfirm(){

  var error = validateProfilePasswordConfirm();
  if(error.length > 0)
    return;

  request('../../Server/Responses/updatePassword.php' ,'POST' ,'input.password', 'outputAreaPasswordForm');
}

function profileCompanyConfirm(){

  var error = validateProfileCompanyConfirm();
  if(error.length > 0)
    return;

  request('../../Server/Responses/updateCompany.php' ,'POST' ,'input.company', 'outputAreaCompanyForm');
}

function request(url, type, dataTarget, outputTarget){

  var data = {};
  $(dataTarget).each(function(index, value){
    var name = $(this).attr('name');
    var value = $(this).val();
    data[name] = value;
  }),
  console.log(data);
  $.ajax({
    url: url,
    type: type,
    data: data,
    success: function(response){
      console.log(response);
      handleUpdateResponse(response, outputTarget);
    },
    error: function(){
      $(outputTarget).slideDown(500).html('We are sorry, something went wrong');
    }
  })
}

function validateProfilePersonalConfirm(){

    var error = '';
    $(".personalFormError").each(function(){

      error =  error + $(this).html();
      if($(this).html().length > 0)
        $(this).toggle( "pulsate", 100).toggle( "pulsate", 100);
    });

    return error;
}

function validateProfilePasswordConfirm(){

     $("input.password").each(function(){
      $(this).trigger('blur');
    });

    var error = '';
    $(".passwordFormError").each(function(){

      error =  error + $(this).html();
      if($(this).html().length > 0)
        $(this).toggle( "pulsate", 100).toggle( "pulsate", 100);
    });

    return error;
}

function validateProfileCompanyConfirm(){

  $("input.company").each(function(){
   $(this).trigger('blur');
 });

 var error = '';
 $(".companyFormError").each(function(){

   error =  error + $(this).html();
   if($(this).html().length > 0)
     $(this).toggle( "pulsate", 100).toggle( "pulsate", 100);
 });

 return error;
}
