
/*HANDLE*/
function HandleResponse(title, text){

  GenerateModal('response-modal', title, text);
  $('#myModal').modal('show');
}

/*CLEAR*/
$(function(){

  $('#myModal').on('hidden.bs.modal', function () {
   ClearElementValue($('#response-modal'));
  });
})


/*RESOURCES*/
function GetLoginTitle(){
  return 'Sign-in';
}

function GetRegisterTitle(){
  return 'Sign-up';
}

function GetNewOrderTitle(){
  return 'New order';
}

function GetAccountInformationTitle(){
  return 'Account';
}

function GetNewPasswordTitle(){
  return 'New Password';
}

function GetCompanyUpdateTitle(){
  return 'Company update';
}

function GetManageUserTitle(){
  return 'Manage user type';
}

function GetUpdateCarTitle(){
  return 'Car update';
}

function GetSubmitOrderTitle(){
  return 'Schedule transport';
}

/*TEXT*/
function GetLoginText(response){
  if(response == 0){
    return "We apologize, user could not be signed in.";
  }
  else if(response == 1){
    return 'Login successful.';
  }
  else if(response == 2){
    return 'Email or password are not valid, please try again.';
  }
  else if(response == -1){
    return 'We are sorry, something went wrong...';
  }

  return "";
}

function GetRegisterText(response){
  if(response == 0){
    return "We apologize, user could not be registered.";
  }
  else if(response == 1){
    return 'Registration successful. Now you can log in';
  }
  else if(response == 2){
    return 'We apologize, this email is already used by someone else.';
  }
  else if(response == -1){
    return 'We are sorry, something went wrong...';
  }

  return "";
}

function GetRegisterByManagerText(response){
  if(response == 0){
    return "We apologize, user could not be registered.";
  }
  else if(response == 1){
    return 'User was registered successfully successful.';
  }
  else if(response == 2){
    return 'We apologize, this email is already used by someone else.';
  }
  else if(response == -1){
    return 'We are sorry, something went wrong...';
  }

  return "";
}

function GetNewOrderText(response){
  if(response == 0){
    return 'We apologize, order could not be created. Please verify that all entered information is correct or try again later.';
  }
  else if(response == 1){
    return 'Order was created successfully.';
  }
  else if(response == 10){
    return 'We apologize, order could not be updated. Please verify that all entered information is correct or try again later.';
  }
  else if(response == 11){
    return 'Order was updated successfully.';
  }
  else if(response == -1){
    return 'We are sorry, something went wrong...';
  }

  return "";
}

function GetAccountInformationText(response){
  if(response == 0){
    return 'We apologize, your account could not be updated.';
  }
  else if(response == 1){
    return 'Your account was updated successfully.';
  }
  else if(response == -1){
    return 'We are sorry, something went wrong...';
  }

  return "";
}

function GetNewPasswordText(response){
  if(response == 0){
    return 'We apologize, your account could not be updated.';
  }
  else if(response == 1){
    return 'Your account was updated successfully.';
  }
  else if(response == -1){
    return 'We are sorry, something went wrong...';
  }

  return "";
}

function GetCompanyUpdateText(response){
  if(response == 0){
    return 'We apologize, company could not be updated.';
  }
  else if(response == 1){
    return 'Company was updated successfully.';
  }
  else if(response == -1){
    return 'We are sorry, something went wrong...';
  }

  return "";
}

function GetManageUserText(response){
  if(response == 0){
    return 'We apologize, user type could not be updated.';
  }
  else if(response == 1){
    return 'User type was updated successfully.';
  }
  else if(response == -1){
    return 'We are sorry, something went wrong...';
  }

  return "";
}

function GetUpdateCarText(response){
  if(response == 0){
    return 'We apologize, car could not be updated.';
  }
  else if(response == 1){
    return 'Car was updated successfully.';
  }
  else if(response == -1){
    return 'We are sorry, something went wrong...';
  }

  return "";
}

function GetSubmitOrderText(response){

  var status = response.status;
  var warning = response.warning;
  var statusMessage = "";
  var warningMessage = "";

  if(status == 0){
    return 'We apologize, scheduled transport could not be confirmed/updated.';
  }
  else if(status == 1){
    statusMessage = 'Scheduled transport has been confirmed/updated successfully.';
  }
  else if(status == -1){
    return 'We are sorry, something went wrong...';
  }

  if(warning.length <= 0){
    warningMessage = "All highway stickers necessary for this journey are up to date.";
  }
  else{
    warningMessage = "Selected car is missing some highway stickers for counry codes: " + warning + ". Make sure you procure them before the transportation.";
  }

  return statusMessage + '\n' + warningMessage;
}
