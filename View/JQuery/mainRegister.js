
  //dynamic functionality register
  $(function(){

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    validateRegistration('blur','#registrationFirstName', '#errorRegistrationFirstName' , /^[a-zA-Z]*$/, 'Use only characters', 3 );
    validateRegistration('blur', '#registrationMiddleName', '#errorRegistrationMiddleName' , /^[a-zA-Z]*$/, 'Use only characters', 1 );
    validateRegistration('blur', '#registrationLastName', '#errorRegistrationLastName' , /^[a-zA-Z]*$/, 'Use only characters', 3 );
    validateRegistration('blur', '#registrationUsername', '#errorRegistrationUsername' , /^[a-zA-Z0-9._-]*$/, 'Character not alowed',6 );
    validateRegistration('blur', '#registrationPassword', '#errorRegistrationPassword' , /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/, 'Use character and digit',8 );
    validateRegistration('blur', '#registrationEmail', '#errorRegistrationEmail' , emailRegex, 'Incorrect email',0 );
    validateRegistration('blur', '#registrationPhone', '#errorRegistrationPhone' , /^[0-9+]*$/, 'Use only digit and "+"',6 );

    //validate confirm password
    $('#registrationConfirmPassword').blur(function(){
      var value = $(this).val();
      if(!value)
        $('#errorRegistrationConfirmPassword').html('Cannot be empty').slideDown(500);
      else if(value != $('#registrationPassword').val()){
        $('#errorRegistrationConfirmPassword').html('Passwords have to match').slideDown(500);
      }
      else{
        $('#errorRegistrationConfirmPassword').html('').slideUp(500);
      }
    }),

    $('#registrationClearButton').on('click', function(){

      clearRegistrationErrors();
      clearRegistrationFields();
    }),

    //submit
    $('form.ajax').on('submit', function(e){

        e.preventDefault();
        if(validateRegistrationConfirm().length > 0)
          return;

        var url = $(this).attr('action');
        var type = $(this).attr('method');
        var data = {};
        $('input[id^="registration"]').each(function(index, value){

          var name = $(this).attr('name');
          var value = $(this).val();
          data[name] = value;
        }),

        $.ajax({
          url: url,
          type: type,
          data: data,
          success: function(response){
            handleRegistrationResponse(response);
          },
          error: function(){
            $('#registrationResponse').slideDown('500').html('We are sorry, something went wrong');
          }
        })
    })
});

function handleRegistrationResponse(response){

  if(response == 'Registration successful'){

    $('#registrationResponseField').slideDown('500').css({
      'background-color' : 'rgba(0, 255, 0, 0.1)'
    });
    $('#registrationResponseText').html(response).css({
      'color' : 'green'
    });
  }
   else{

     $('#registrationResponseField').slideDown('500').css({
      'background-color' : 'rgba(255, 0, 0, 0.1)'
    });
    $('#registrationResponseText').html(response).css({
      'color' : 'red'
    });
   }
}

function validateRegistrationConfirm(){

    var error = '';
    //trigger blur - to repeat automatic error check on click
    $('input[id^="registration"]').trigger('blur');

    $(".errorMessage").each(function(index){

      error =  error + $(this).html();
      if($(this).html().length > 0)
        $(this).toggle( "pulsate", 100).toggle( "pulsate", 100);
    });

    return error;
}

function clearRegistrationFields(){

  $('#registrationFirstName').val('');
  $('#registrationMiddleName').val('');
  $('#registrationLastName').val('');
  $('#registrationUsername').val('');
  $('#registrationPassword').val('');
  $('#registrationConfirmPassword').val('');
  $('#registrationEmail').val('');
  $('#registrationPhone').val('');
}

function clearRegistrationErrors(){
  $('#errorRegistrationFirstName').html('').slideUp(500);
  $('#errorRegistrationMiddleName').html('').slideUp(500);
  $('#errorRegistrationLastName').html('').slideUp(500);
  $('#errorRegistrationUsername').html('').slideUp(500);
  $('#errorRegistrationPassword').html('').slideUp(500);
  $('#errorRegistrationConfirmPassword').html('').slideUp(500);
  $('#errorRegistrationEmail').html('').slideUp(500);
  $('#errorRegistrationPhone').html('').slideUp(500);
}

function validateRegistration(thisEvent, id, idErr, regex, customeMessage, min){

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
