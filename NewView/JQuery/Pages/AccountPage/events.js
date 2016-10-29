/*SUBMIT BUTTON*/
$(document).on('click', '.btn-submit-account-information', function(){
  var form = GetFormWithButton(this);
  SubmitFormAccountInformation(form);
});

$(document).on('click', '.btn-submit-password', function(){
  var form = GetFormWithButton(this);
  SubmitFormPassword(form);
});

$(document).on('click', '.btn-submit-company', function(){
  var form = GetFormWithButton(this);
  SubmitFormCompany(form);
})

/*FORM BLUR*/
$(document).on('blur', '.form-control', function(){
  ValidateElement($(this));
});
/*CLEAR BUTTON*/
$(document).on('click', '.btn-clear', function(){
  var form = GetFormWithButton(this);
  ClearForm(form);
});
