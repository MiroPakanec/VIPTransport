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

  /*$('.btn-submit-offitial').on('click', function(e){
    if (e.isDefaultPrevented()) {
      console.log('invalid');
    } else {
      console.log('valid');
    }
  });*/
});
