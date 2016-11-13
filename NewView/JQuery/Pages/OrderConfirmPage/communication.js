function LoadOrders(){
  var data = {id: '', email:'', dateFrom:'', dateTo:''};
  var url = GetOrdersUrl();
  ajaxCall(LoadOrdersResponse, "POST", url, 'json', data);
}

function LoadRoutesCar(){
  var data = {};
  var url = GetRoutesUrl();
  ajaxCall(LoadRoutesCarResponse, "GET", url, 'json', data);
}

function LoadRoutesEmployee(){
  var data = {};
  var url = GetRoutesUrl();
  ajaxCall(LoadRoutesEmployeeResponse, "GET", url, 'json', data);
}

function LoadCars(){
  var url = GetCarsUrl();
  ajaxCall(LoadCarsResponse, "POST", url, 'json', '');
}

function LoadUsers(type){

  var data = {type: type, email:'', fname:'', lname:''};
  var url = GetUsersUrl();

  ajaxCall(LoadUsersResponse, "POST", url, 'json', data);
}

function LoadStickers(){
  var url = GetCountriesUrl();
  ajaxCall(LoadStickersResponse, "GET", url, '', '');
}

function LoadOrder(id){

  if(id == null){
    return;
  }

  var data = {id: id, email:'', dateFrom:'', dateTo:''};
  var url = GetOrdersUrl();
  ajaxCall(LoadOrderResponse, "POST", url, 'json', data);
}

function LoadRoute(orderId){

  if(orderId == null){
    return;
  }

  var data = {orderId: orderId};
  var url = GetRoutesUrl();
  ajaxCall(LoadRouteResponse, "GET", url, 'json', data);
}

function SubmitFormConfirmOrder(){

  var formId = $('.form-id');
  var formSubmit = $('.form-submit');

  ValidateForm(formId);
  if(IsFormCorrect(formId) == false){
    return;
  }

  ValidateForm(formSubmit);
  if(IsFormCorrect(formSubmit) == false){
    return;
  }

  var url = GetConfirmOrderUrl();
  var dataId = GetFormData(formId);
  var data = GetFormData(formSubmit);

  //MANAGE DATA
  var data = ManageSubmitData(data, dataId);
  ajaxCall(SubmitOrderResponse, "POST", url, 'json', data);
}

function LoadOrdersResponse(response){
  console.log("Response to the ajax request - Get orders (confirm)");
  console.log(response);

  if(response == null){
    throw "unable to load orders";
    return;
  }

  GenerateIdOptions(response);
  if(HasSelectedId()){
    SelectOrder();
  }
}

function LoadCarsResponse(response){

  console.log("Response to the ajax request - Get cars");
  console.log(response);

  if(response == null){
    throw "unable to load cars";
    return;
  }

  GenerateCarOptions(response);
  LoadRoute($('#options-id').val());
}

function LoadUsersResponse(response){

  console.log("Response to the ajax request - Get users");
  console.log(response);

  if(response == null){
    throw "unable to load users";
    return;
  }

  GenerateUserOptions(response);
}

function LoadOrderResponse(response){

  console.log("Response to the ajax request - Get order (confirm)");
  console.log(response);

  if(response == null){
    return;
  }

  FillOrderDetails(response);
  //ORDER DATE NECESSARY
  LoadCars();
}

function LoadRoutesCarResponse(response){

  console.log("Response to the ajax request - Get routes car (confirm)");
  console.log(response);

  if(response == null){
    throw "unable to load routes";
    return;
  }

  var carResult = IsCarFree(response);
  IsCarFreeResponse(carResult, $('#car-check'));
}

function LoadRoutesEmployeeResponse(response){

  console.log("Response to the ajax request - Get routes employee (confirm)");
  console.log(response);

  if(response == null){
    throw "unable to load routes";
    return;
  }

  var employeeResult = IsEmploeeFree(response);
  IsEmployeeFreeResponse(employeeResult, $('#employee-check'));
}

function LoadStickersResponse(response){

  console.log("Response to the ajax request - Get Countries");
  console.log(response);

  if(response == null){
    throw "unable to load stickers";
    return;
  }

  GenerateStickerOptions(response);
}

function LoadRouteResponse(response){

  console.log("Response to the ajax request - get route");
  console.log(response);

  if(response.length == 0){
    SetNonExistingRoute();
    return;
  }

  SetExistingRoute(response[0]);
}

function SubmitOrderResponse(response){

  console.log("Response to the ajax request - Submit order");
  console.log(response);

  var title = GetSubmitOrderTitle();
  var text = GetSubmitOrderText(response);

  HandleResponse(title, text);
  if(response.status == 1){
    SimulateReload($('#options-id').val());
  }
}
