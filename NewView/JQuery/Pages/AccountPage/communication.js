function SubmitFormAccountInformation(form){

  ValidateForm(form);
  if(IsFormCorrect(form) == false){
    return;
  }

  var url = GetAccountInformationUrl();
  var data = GetFormData(form);
  console.log(data);

  ajaxCall(AccountInformationResponse, "POST", url, '', data);
}

function SubmitFormPassword(form){

  ValidateForm(form);
  if(IsFormCorrect(form) == false){
    return;
  }

  var url = GetNewPasswordUrl();
  var data = GetFormData(form);

  console.log(data);
  ajaxCall(NewPasswordResponse, "POST", url, '', data);
}

function LoadCompany(email){

  if(email == null){
    throw "null reference exception - session email.";
    return;
  }

  var data = {email: email};
  console.log(data);
  var url = GetCompanyUrl();
  ajaxCall(LoadCompanyResponse, "GET", url, 'json', data);
}

function SubmitFormCompany(form){

  ValidateForm(form);
  if(IsFormCorrect(form) == false){
    return;
  }

  var url = GetUpdateCompanyUrl();
  var data = GetFormData(form);

  console.log(data);
  ajaxCall(CompanyUpdateResponse, "POST", url, '', data);
}

function AccountInformationResponse(response){

  console.log("Response to the ajax request - Account Information.");
  console.log(response);

  var title = GetAccountInformationTitle();
  var text = GetAccountInformationText(response);

  VerifyAccountInformationResponse();
  HandleResponse(title, text);
}

function VerifyAccountInformationResponse(){

  var form = $('#form-account-information');
  ResetForm(form);
}

function NewPasswordResponse(response){

  console.log("Response to the ajax request - New Password.");
  console.log(response);

  var title = GetNewPasswordTitle();
  var text = GetNewPasswordText(response);

  VerifyNewPasswordResponse();
  HandleResponse(title, text);
}

function VerifyNewPasswordResponse(){

  var form = $('#form-new-password');
  ClearForm(form);
}

function LoadCompanyResponse(response){

  console.log("Response to the ajax request - Load Company.");
  console.log(response);

  if(response == null){
    return;
  }

  $("input[name*='companyName']").val(response.name);
  $("input[name*='invoiceAddress']").val(response.address);
  $("input[name*='ico']").val(response.ico);
  $("input[name*='dic']").val(response.dic);
}

function CompanyUpdateResponse(response){

  console.log("Response to the ajax request - Company Update.");
  console.log(response);

  var title = GetCompanyUpdateTitle();
  var text = GetCompanyUpdateText(response);

  VerifyCompanyUpdateResponse();
  HandleResponse(title, text);
}

function VerifyCompanyUpdateResponse(){

  var form = $('#form-company');
  ResetForm(form);
}
