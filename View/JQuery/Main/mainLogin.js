
$(function(){

  validateLogin('blur', '#loginEmail', '#errorLoginEmail');
  validateLogin('blur', '#loginPassword', '#errorLoginPassword');

  $('#loginClearButton').on('click', function(){

    clearLogin();
    clearError();
  }),

  $('#loginForm').on('submit', function(e){

        e.preventDefault();
        if(validateLoginConfirm().length > 0)
          return;

        var url = $(this).attr('action');
        var type = $(this).attr('method');
        var data = {};
        $('input[id^="login"]').each(function(index, value){

          var name = $(this).attr('name');
          var value = $(this).val();
          data[name] = value;
        }),

        $.ajax({
          url: url,
          type: type,
          data: data,
          success: function(response){
            handleLoginResponse(response);
          },
          error: function(){
            $('#loginResponse').slideDown(500).html('We are sorry, something went wrong');
          }
        })
  })
})

function handleLoginResponse(response){

  if(response == 'in')
    window.location="homePage.html";
  else{

    $('#loginResponseField').slideDown(500).css({
     'background-color' : 'rgba(255, 0, 0, 0.1)'
   });
   $('#loginResponseText').html(response).css({
     'color' : 'red'
   });
  }
}

function clearLogin(){

  $('#loginEmail').val('');
  $('#loginPassword').val('');
  $('#loginResponseField').slideUp(500);
}

function clearError(){

  $('#errorLoginEmail').slideUp(500);
  $('#errorLoginPassword').slideUp(500);
}

function validateLoginConfirm(){

  var error = '';
  //trigger blur - to repeat automatic error check on click
  $('input[id^="login"]').trigger('blur');

  $(".errorMessageLogin").each(function(index){

    error =  error + $(this).html();
    if($(this).html().length > 0)
      $(this).toggle( "pulsate", 100).toggle( "pulsate", 100);
  });

  return error;
}

function validateLogin(thisEvent, id, idErr){

  $(id).on(thisEvent, function(){
    var value = $(this).val().trim();
    $(id).val(value);
    
    if(!value)
      $(idErr).html('Cannot be empty').slideDown(500);
    else
      $(idErr).html('').slideUp(500);
  })
}
