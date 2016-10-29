function SubmitFormLogin(form){

  ValidateForm(form);
  if(IsFormCorrect(form) == false){
    return;
  }

  var url = GetLoginUrl();
  var data = GetFormData(form);
  ajaxCall(LoginResponse, "POST", url, '', data);
}

function SubmitFormRegister(form){

  ValidateForm(form);
  if(IsFormCorrect(form) == false){
    return;
  }

  var url = GetRegisterUrl();
  var data = GetFormData(form);
  ajaxCall(RegisterResponse, "POST", url, '', data);
}

function LoginResponse(response){

  console.log("Response to the ajax request - Login");
  console.log(response);

  var title = GetLoginTitle();
  var text = GetLoginText(response);

  VerifyLoginResponse(response);
  HandleResponse(title, text);
}

function RegisterResponse(response){

  console.log("Response to the ajax request - Register");
  console.log(response);

  var title = GetRegisterTitle();
  var text = GetRegisterText(response);

  VerifyRegisterResponse(response);
  HandleResponse(title, text);
}

function VerifyLoginResponse(response){

  console.log(response);
  if(response == 1){
    RedirectHome();
  }
  else{
    var form = $('#form-login');
    ResetForm(form);
    TriggerClear();
  }
}

function VerifyRegisterResponse(response){

  if(response == 1){
    TriggerClear();
  }
  else{
    var form = $('#form-register');
    ResetForm(form);
  }
}
