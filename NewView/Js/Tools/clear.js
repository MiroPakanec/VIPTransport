function ClearForm(form){
  $(form).find('.form-control').each(function(){
    ClearElementValue(this);
    SetElementDefaultValue(this);
    HideErrors(this);
    HideOutline(this);
  });

  ClearGeneratedElements(form);
}

function ClearGeneratedElements(form){
  $(form).find('.generated').each(function(){
      ClearElementValue(this);
  });
}
