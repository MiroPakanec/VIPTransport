
$(document).on('click', '.btn-radio', function(){

  RemoveActiveClass('.btn-radio');
  $(this).addClass('active');

  LoadUsers();
});

$(document).on('click', '.search-btn', function(){
  LoadUsers();
});

$(document).on('keyup', '.search-input', function(){
  LoadUsers();
});

$(document).on('blur', '.form-control', function(){
  ValidateElement($(this));
});

$(document).on('click', '.btn-table-edit', function(){

  var email = GetRowId($(this));
  LoadUser(email);
});

$(document).on('click', '.btn-clear', function(){
  var form = GetFormWithButton(this);
  ClearForm(form);
});

$(document).on('click', '#register-form-clear', function(){

  $('#copy').prop("disabled", true);
  $('#copy').removeClass('btn-standard-danger');
  $('#copy').addClass('btn-standard');
});

$(document).on('click', '.btn-submit', function(){
  var form = GetFormWithButton(this);
  SubmitFormManageUser(form);
});

$(document).on('click', '.btn-submit-register', function(){
  var form = GetFormWithButton(this);
  SubmitFormRegisterUser(form);
});

$(document).on('click', '.btn-generate-password', function(){
  var target = $(this).attr('targer');
  GeneratePassword(target);
  $('#copy').prop("disabled", false);
  $('#copy').removeClass('btn-standard');
  $('#copy').addClass('btn-standard-danger');
});

$(document).on('click', '.btn-copy', function(){

  $('#copy').removeClass('btn-standard-danger');
  $('#copy').addClass('btn-standard');
  var target = $(this).attr('targer');
  window.prompt('Copy password: ', $('#' + target).val());
})
