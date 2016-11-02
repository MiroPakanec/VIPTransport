function AdjustNavbarForManager(){

  var element = $('.nav').find('.dynamic-dropdown');

  if(element == null || element == 'undefined'){
    return;
  }

  $(element).html(GenerateManagerDropdown());
  LoadRoutesJson();
}

function AdjustNavbarForEmployee(){
  throw "Not imeplemented exception";
}
