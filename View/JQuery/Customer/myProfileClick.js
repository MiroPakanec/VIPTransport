var profilePictureObject;

$(function (){

  $('#personalFormSelection').on('click', function(){

    $('#formSelection').hide();
    $('#personalForm').fadeIn(500);
  }),

  $('#changePasswordSelection').on('click', function(){

    $('#formSelection').hide();
    $('#passwordForm').fadeIn(500);
  }),

  $('.profileBackButton').on('click', function(){
    $(this).parent().parent().hide();
    $('#formSelection').fadeIn(500);
    $('.outputAreaForm').each(function(){
      $(this).slideUp(500);
    });
  }),

  $('#addCompanySelection').on('click', function(){
      $('#formSelection').hide();
      $('#companyForm').fadeIn(500);
  }),

  $('#personalCancelButton').on('click', function(){

    $('.personalFormError').each(function(){
      $(this).slideUp(500);
    })
    getSessionData();
    $('.outputAreaForm').each(function(){
      $(this).slideUp(500);
    })
  }),

  $('#passwordClearButton').on('click', function(){

    $('#currentPassword').val('');
    $('#newPassword').val('');
    $('#newPasswordRepeat').val('');

    $('.outputAreaForm').each(function(){
      $(this).slideUp(500);
    });
    $('.passwordFormError').each(function(){
      $(this).slideUp(500);
    })

  }),

  $('#companyCancelButton').on('click', function(){

    $('#companyName').val('');
    $('#invoiceAddress').val('');
    $('#ico').val('');
    $('#dic').val('');
  })

  $('#profilePictureButton').on('click', function(){
    $('#filePicker').trigger('click');
  }),

  $("#filePicker").change(function(){
    var file = this.files[0];
    var htmlResponse;
    validationMessage = validateFile(file);

    if(validationMessage.length > 1){
      htmlResponse = generateHtmlResponse(validationMessage, false);
      negativeResponse(htmlResponse, '#outputAreaPicture');
    }
    else{
      var tmppath = URL.createObjectURL(file);
      $('#profilePicture').css({
        'background-image' : 'url('+tmppath+')'
      })
      profilePictureObject = file;
      htmlResponse = generateHtmlResponse('Do you like\nthis image?', file);
      neutralResponse(htmlResponse, '#outputAreaPicture');
    }
  }),

  $(document).on('click','#cancelPictureButton',function(){

    loadProfilePicture('session');
    $('#outputAreaPicture').slideUp(500);
    setTimeout(function(){
      $('#outputAreaPicture').html('')
    }, 300);
    $('input[type="file"]').val(null);
  }),

  $(document).on('click','#savePictureButton',function(){

    $('#outputAreaPicture').html('');
    setTimeout(function() {
        $("#outputAreaPicture").slideUp(500);
    },5000);

    var file = profilePictureObject;
    var request = new XMLHttpRequest();

    var formData = new FormData();
    formData.append('file', file);

    $.ajax({
      url: "../../Server/Responses/profilePicture.php",
      type: "POST",
      data: formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false,   // tell jQuery not to set contentType
      success: function(response){
        handleProfilePictureResponse(response);
      }
    });
  })
})

function handleProfilePictureResponse(response){

  if(response == 0){
    var responseText = '<p>We are sorry<br>picture could not be changed</p>';
    negativeResponse(responseText, '#outputAreaPicture');
  }
  else{
    var responseText = '<p>Picture was changed<br>successfully</p>'
    positiveResponse(responseText, '#outputAreaPicture');
  }
}

function negativeResponse(response, id){

  $(id).html(response).css({
      'background-color' : 'rgba(255,0,0,0.1)',
      'color' : 'red',
      'border-color' : 'rgba(255,0,0,0.3)'
    }).slideDown(500);
}

function positiveResponse(response, id){

  $(id).html(response).css({
      'background-color' : 'rgba(0,255,0,0.1)',
      'color' : 'green',
      'border-color' : 'rgba(0,255,0,0.4)'
    }).slideDown(500);
}

function neutralResponse(response, id){

  $(id).html(response).css({
      'background-color' : 'rgba(255,255,255,0.2)',
      'color' : 'white',
      'border-color' : 'rgba(255,255,255,0.4)'
    }).slideDown(500);
}

function generateHtmlResponse(message, file){

  var html = '<p>' + message + '</p>';

  if(file){

      html += '<input type="button" value="Save" class="button smallText respoonseButton" id="savePictureButton">' +
              '<input type="button" value="Cancel" class="button smallText respoonseButton" id="cancelPictureButton">';
      return html;
  }
  else
    return html;
}

function validateFile(file){

  var ext = file.name.split('.').pop();
  if(!ext.match(/(jpg|jpeg|png|gif)$/))
    return 'Incorrect format';

  if(file.size/1024/1024 > 1)
    return 'Picture must not be <br>bigger than 1MB';

  return 1;
}

function validateFileSize(file){

  if(file.size/1024/1024 > 2)
    return 'The image is too big';

  return;
}
