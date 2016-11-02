function LoadUsers(type){

  var data = GetSearchData();
  var url = GetUsersUrl();

  console.log(data);
  ajaxCall(LoadUsersResponse, "POST", url, 'json', data);
}

function LoadUser(email){

  var data = {type: '', email:email, fname:'', lname:''};
  var url = GetUserUrl();

  console.log(data);
  ajaxCall(LoadUserResponse, "POST", url, 'json', data);
}

function SubmitFormManageUser(form){

  ValidateForm(form);
  if(IsFormCorrect(form) == false){
    return;
  }

  var url = GetChangeUserTypeUrl();

  var data = GetFormData(form);
  data = ManageUserData(data);

  ajaxCall(ManageUserResponse, "POST", url, '', data);
}

function SubmitFormRegisterUser(form){

  ValidateForm(form);
  if(IsFormCorrect(form) == false){
    return;
  }

  var url = GetRegisterUrl();

  var data = GetFormData(form);
  data = ManageUserData(data);

  ajaxCall(RegisterResponse, "POST", url, '', data);
}

function LoadUsersResponse(response){

  console.log("Response to the ajax request - Get users");
  console.log(response);

  if(response != null){
    GenerateTableBody(response);
  }
}

function LoadUserResponse(response){

  console.log("Response to the ajax request - Get user");
  console.log(response);

  if(response == null){
    throw "user was not properly loaded.";
    return;
  }

  FillFormWithUser(response);
}

function ManageUserResponse(response){

  console.log("Response to the ajax request - Manage user");
  console.log(response);

  var title = GetManageUserTitle();
  var text = GetManageUserText(response);

  HandleResponse(title, text);
}

function RegisterResponse(response){

  console.log("Response to the ajax request - Register");
  console.log(response);

  var title = GetRegisterTitle();
  var text = GetRegisterByManagerText(response);

  VerifyRegisterResponse(response);
  HandleResponse(title, text);
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
