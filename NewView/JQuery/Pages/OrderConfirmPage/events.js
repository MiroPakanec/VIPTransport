$(document).on('change', '#options-id', function(){
  console.log('---Order ID was selected --');
  var id = $(this).val();
  var defaultVal = $(this).attr('default');

  if(id == defaultVal){
    $('.btn-clear').trigger('click');
    return;
  }

  LoadOrder(id);
  //LoadRoute(id);
  Disable(false);
});

$(document).on('change', '#options-car', function(){
  var id = $(this).val();
  var defaultVal = $(this).attr('default');

  if(id == defaultVal){
    ClearCar();
    return;
  }

  LoadRoutesCar();
});

$(document).on('change', '#options-employee', function(){
  var id = $(this).val();
  var defaultVal = $(this).attr('default');

  if(id == defaultVal){
    ClearEmployee();
    return;
  }

  LoadRoutesEmployee();
});

$(document).on('click', '.btn-clear', function(){
  var form = GetFormWithButton(this);
  ClearForm(form);
  ClearForm('.form-info');
  ClearForm('.form-id');
  Disable(true);
  ClearStickers();
});

$(document).on('click', '.btn-countrycode', function(){
  var code = $(this).attr('countryCode');
  if($(this).hasClass('cc-selected')){
    RemoveCountryCode(code);
    $(this).removeClass('cc-selected');
    return;
  }

  $('#stickers').val($('#stickers').val() + code + '/');
  $(this).addClass('cc-selected');
});

$(document).on('click', '.btn-submit', function(){
  var form = GetFormWithButton(this);
  SubmitFormConfirmOrder(form);
});
