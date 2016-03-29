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
  }),

  $('#addCompanySelection').on('click', function(){
      $('#formSelection').hide();
      $('#companyForm').fadeIn(500);
  }),

  $('#personalCancelButton').on('click', function(){

    getSessionData();
  })
})
