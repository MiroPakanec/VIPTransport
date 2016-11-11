function GenerateIdOptions(data){

  for (index in data){
    GenerateElementOption(data[index].id, "#options-id");
  }
}

function GenerateCarOptions(data){
  for (index in data){

    if(IsCarCapable(data) == false){
      continue;
    }
    GenerateElementOption(data[index].Spz, "#options-car");
  }
}

function GenerateUserOptions(data){
  for (index in data){
    GenerateElementOption(data[index].email, "#options-employee");
  }
}

function GenerateStickerOptions(data){
  for (index in data){
    GenerateElementCountryOption(data[index].name, data[index].alpha2Code, ".sticker-section");
  }
}

function HasSelectedId(){

  var url = window.location.href;
  var urlParams = URLToArray(url);

  if("id" in urlParams){
    return true;
  }
  return false;
}

function SelectOrder(){

  var id = GetIdFromUrl();
  $('#options-id').val(id);
  /*SOMEHOW NEEDED FIX*/
  $('#options-id').trigger('change');
}

function GetIdFromUrl(){
  var url = window.location.href;
  var urlParams = URLToArray(url);
  var id = urlParams["id"];
  return id;
}

function FillOrderDetails(response){

  var order = response[0];
  FillFormData('.form-info', order);
}

function Disable(value){

  $('#options-employee').attr('disabled', value);
  $('#options-car').attr('disabled', value);
}

function RemoveCountryCode(code){

  var stickers = $('#stickers').val();
  var stickers = stickers.replace(code + '/', "");
  $('#stickers').val(stickers);
}

function ClearStickers(){
  $('.sticker-section').find('.btn-countrycode').each(function(){
    $(this).removeClass('cc-selected');
  });
}

function ManageStickerData(stickerString){

  var stickers = {};
  if(stickerString == null || stickerString.length <= 0){
    return undefined;
  }

  stickers = stickerString.split('/');
  for (index in stickers){

    if(stickers[index].length <= 0){
      stickers[index] = undefined;
    }
  }

  return stickers;
}

function SetNonExistingRoute(){

  $('#options-car').val('Car');
  $('#options-car').trigger('change');
  $('#options-employee').val('Employee');
  $('#options-employee').trigger('change');
  $('#route-id').val('Not yet created.');

  $('.sticker-section').find('.cc-selected').each(function(){
    $(this).trigger('click');
  });
}

function SetExistingRoute(route){

  var routeId = route[0];
  var employee = route[3];
  var car = route[4];
  var countrycodes = route[5];

  $('#options-car').val(car);
  $('#options-car').trigger('change');

  $('#options-employee').val(employee);
  $('#options-employee').trigger('change');

  $('#route-id').val(routeId);

  for (index in countrycodes){

    $('.sticker-section').find('.btn-countrycode').each(function(){
      var cc = $(this).attr('countryCode');
      if(countrycodes[index] == cc){
        $(this).trigger('click');
      }
    });
  }
}

function ManageSubmitData(data, dataId){

  var routeId = $('#route-id').val();
  data.orderId = dataId.orderId;
  data.routeId = dataId.routeId;

  if(routeId == 'Not yet created.'){
    data.action = 'confirm';
  }
  else{
    data.action = 'update';
  }
  data.countryCodes = ManageStickerData(data.countryCodes);

  return data;
}
