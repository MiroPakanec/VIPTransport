$(document).on('blur', '.form-control', function(){

  if($(this).hasClass('form-blur-skip')){
    return;
  }
  ValidateElement($(this));
});

$(document).on('click', '.btn-table-expand', function(){
  ClearForms();
  var spz = GetRowId($(this));
  LoadCar(spz);
});

/*CONFIRM DELETE*/
$(document).on('show.bs.modal', '#confirm-delete', function(e) {

    var id = GetRowId($(e.relatedTarget));
    var url =  $(e.relatedTarget).data('href') + "?spz=" + id;

    console.log(e);
    $(this).find('.btn-ok').attr('href', url);
});

$(document).on('click', '.btn-ok', function(){
  var url = $(this).attr('href');
  var data = URLToArray(url);

  ajaxCall(DeleteResponse, "POST", url, null, data);
});

$(document).on('click', '.btn-clear', function(){
  ClearForms();
});

$(document).on('click', '.btn-submit', function(){
  console.log('submit');
  SubmitCar();
});

$(document).on('click', '.btn-add-sticker', function(){
  GenerateSticker('', '');
  /*FIX*/
  $('.form_date').trigger('click');
});

$(document).on('click', '.btn-remove-sticker', function(){
  var sticker = FindClosestParentWithClass(this, 'row-sticker');
  $(sticker).remove();
});

$(document).on('click', '.btn-remove-service', function(){
  var service = FindClosestParentWithClass(this, 'row-service');
  $(service).remove();
});

$(document).on('click', '.btn-add-service', function(){
  GenerateService('', '', '');
  /*FIX*/
  $('.form_date').trigger('click');
});

$(document).on('change', '#selection-stickers', function(){
  if($(this).val() == 'Spz'){
    ClearForms();
    return;
  }

  var spz = $(this).val();
  ClearForms();
  LoadCar(spz);
});

$(document).on('change', '#selection-services', function(){

  if($(this).val() == 'Spz'){
    ClearForms();
    return;
  }

  var spz = $(this).val();
  ClearForms();
  LoadCar(spz);
});
