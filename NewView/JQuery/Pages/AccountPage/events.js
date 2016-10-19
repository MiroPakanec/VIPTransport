/*SUBMIT BUTTON*/
$(document).on('click', '.btn-submit', function(){
  var form = GetFormWithButton(this);
  ValidateForm(form);
});
/*LOGIN BLUR*/
$(document).on('blur', '.form-control', function(){
  ValidateElement($(this));
});
/*CLEAR BUTTON*/
$(document).on('click', '.btn-clear', function(){
  var form = GetFormWithButton(this);
  ClearForm(form);
});
