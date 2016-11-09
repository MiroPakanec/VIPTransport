function LoadCars(){

  var url = GetCarsUrl();
  ajaxCall(LoadCarsResponse, "POST", url, 'json', '');
}

function LoadCar(spz){
  var data = {spz:spz};
  var url = GetCarsUrl();

  console.log(data);
  ajaxCall(LoadCarResponse, "POST", url, 'json', data);
}

function SubmitCar(){

  var carForm = $('#form-car');
  var stickersForm = $('#form-stickers');
  var servicesForm = $('#form-services');

  ValidateForm(carForm);
  ValidateForm(stickersForm);
  ValidateForm(servicesForm);

  if((IsFormCorrect(carForm) == false) || (IsFormCorrect(stickersForm) == false) || (IsFormCorrect(servicesForm) == false)){
    return;
  }

  var cardata = GetFormData(carForm);
  cardata = ManageData(cardata);

  var stickersdata = GetStickerFormData(stickersForm);
  var servicesdata = GetServiceFormData(servicesForm);

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  for (var key in stickersdata) {
    if (hasOwnProperty.call(stickersdata, key)){
      cardata.stickers = stickersdata;
    };
  }

  for (var key in servicesdata) {
    if (hasOwnProperty.call(servicesdata, key)){
      cardata.services = servicesdata;
    };
  }

  /*FIX*/
  cardata.action = 'update';
  cardata.relativeMealige = 200;

  console.log(cardata);

  var url = GetCarUpdateUrl();
  ajaxCall(SubmitCarResponse, "POST", url, '', cardata);
}

function LoadCarsResponse(response){

  console.log("Response to the ajax request - Get cars");
  console.log(response);

  if(response != null){
    GenerateTableBody(response);
    GenerateCarOptios(response);
  }
}

function LoadCarResponse(response){

  console.log("Response to the ajax request - Get car");
  console.log(response);

  if(response == null){
    throw "car was not properly loaded.";
    return;
  }

  FillFormWithCar(response);
  GenerateStickers(response);
  GenerateServices(response);
}

function SubmitCarResponse(response){

  console.log("Response to the ajax request - Update car");
  console.log(response);

  var title = GetUpdateCarTitle();
  var text = GetUpdateCarText(response);

  VerifyCarUpdateResponse(response);
  HandleResponse(title, text);
}

function DeleteResponse(response){

  console.log("Response to the ajax request - Delete car");
  console.log(response);

  GenerateTable();
}

function VerifyCarUpdateResponse(response){

  if(response == 1){
    LoadCars();
    ResetForm($('#form-car'));
    ResetForm($('#form-stickers'));
    ResetForm($('#form-services'));
  }
}
