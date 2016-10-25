$(function(){
  /*REGISTER SUBMIT*/
  $(document).on('click', '.btn-submit-register', function(){
    var form = GetFormWithButton(this);
    SubmitFormRegister(form);
  });
  
  /*LOGIN SUBMIT*/
  $(document).on('click', '.btn-submit-login', function(){
    var form = GetFormWithButton(this);
    SubmitFormLogin(form);
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
});
