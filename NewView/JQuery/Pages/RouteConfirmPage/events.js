$(document).on('blur', '.form-control', function(){
  if($(this).hasClass('form-blur-skip')){
    return;
  }
  ValidateElement($(this));
});

$(document).on('click', '.btn-submit', function(){
  SubmitRoute();
});

$(document).on('change', '.duration', function(){
    CalculateDuration();
});

$(document).on('change', '.distance', function(){
    //Load car -> get mealige and compare with changed mealige to get distance
    LoadCar();
});

$(document).on('click', '.btn-clear', function(){
  ClearForm($('.form-info-transportation'));
});
