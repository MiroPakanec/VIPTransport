$(function(){
  /*LOGIN SUBMIT*/
  $('.btn-submit').on('click', function(){
    var form = GetFormWithButton(this);
    ValidateForm(form);
  });
  /*LOGIN BLUR*/
  $('.form-control').on('blur', function(){
    ValidateElement($(this));
  });
  /*CLEAR BUTTON*/
  $(document).on('click', '.btn-clear', function(){
    var form = GetFormWithButton(this);
    ClearForm(form);
  });
});
