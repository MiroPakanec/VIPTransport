function SubmitRoute(){

  if(ValidateSubmit() == false){
    return;
  }

  var data = GetSubmitRouteData();
  console.log(data);
  var url = GetSubmitTransportUrl();
  ajaxCall(SubmitRouteResponse, "POST", url, '', data);
}

function LoadOrder(id){

  var data = {id: id, email:'', dateFrom:'', dateTo:''};
  var url = GetOrdersUrl();
  ajaxCall(LoadOrderResponse, "POST", url, 'json', data);
}

function LoadRoute(orderId){

  var data = {orderId: orderId};
  var url = GetRoutesUrl();
  ajaxCall(LoadRouteResponse, "GET", url, 'json', data);
}

function LoadUser(){
  var url = GetSessionUrl();
  ajaxCall(LoadUserResponse, 'GET', url, 'json', '');
}

function LoadCustomerWithOrder(id){

  var data = {id: id, email:'', dateFrom:'', dateTo:''};
  var url = GetOrdersUrl();
  ajaxCall(LoadCustomerWithOrderResponse, "POST", url, 'json', data);
}

function LoadCustomer(email){

  var data = {type: '', email:email, fname:'', lname:''};
  var url = GetUserUrl();
  ajaxCall(LoadCustomerResponse, "POST", url, 'json', data);
}

function LoadCompany(email){
  var data = {email: email};
  var url = GetCompanyUrl();
  ajaxCall(LoadCompanyResponse, "GET", url, 'json', data);
}

function LoadCar(){
  var spz = $('input[name=4]').val();
  var data = {spz:spz};
  var url = GetCarsUrl();
  ajaxCall(LoadCarResponse, "POST", url, 'json', data);
}

function LoadOrderResponse(response){

  console.log("Response to the ajax request - Get order");
  console.log(response);

  if(response == null){
    return;
  }

  var form = $('.form-info-order');
  FillData(response[0], form);
}


function LoadRouteResponse(response){

  console.log("Response to the ajax request - get route");
  console.log(response[0]);

  if(response == null){
    return;
  }

  var form = $('.form-info-route');
  FillData(response[0], form);
}

function LoadUserResponse(response){

  console.log("Response to the ajax request - Get user");
  console.log(response);

  if(response == null){
    RedirectMain();
  }

  var form = $('.form-confirmed-by');
  FillData(response, form);
}

function LoadCustomerWithOrderResponse(response){

  console.log("Response to the ajax request - Get customer with order");
  console.log(response);

  var email = response[0].email;
  if(email == null){
    return;
  }

  LoadCustomer(email);
  LoadCompany(email);
}

function LoadCustomerResponse(response){

  console.log("Response to the ajax request - Get customer");
  console.log(response);

  if(response == null){
    return;
  }

  var form = $('.form-info-customer');
  FillData(response, form);
}

function LoadCompanyResponse(response){

  console.log("Response to the ajax request - Get company");
  console.log(response);

  if(response == null){
    return;
  }

  var form = $('.form-info-company');
  FillData(response, form);
}

function LoadCarResponse(response){

  console.log("Response to the ajax request - Load car");
  console.log(response);

  if(response == null){
    return;
  }

  CalculateDistance(response.car1);
}

function SubmitRouteResponse(response){

  console.log("Response to the ajax request - Submit route");
  console.log(response);

  RedirectHistory();
}
