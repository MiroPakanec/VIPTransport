function LoadSession(){

  console.log('loading session...');
  var url = GetSessionUrl();
  ajaxCall(LoadSessionResponse, 'GET', url, 'json', '');
}

function VerifyManagerSectionSession(){
  console.log('loading session to verify type...');
  var url = GetSessionUrl();
  ajaxCall(VerifyManagerSectionSessionResponse, 'GET', url, 'json', '');
}

function EndSession(){

  var url = GetEndSessionUrl();
  ajaxCall(EndSessionResponse, 'GET', url, 'json', '');
}

function LoadSessionResponse(response){

  console.log("Response to the ajax request - Load session");
  console.log(response);

  AdjustNavbar(response);
  AuthenticateUser(response);
  SaveToken(response);
}

function EndSessionResponse(response){

  console.log("Response to the ajax request - End session");
  console.log(response);

  if(response == 0){
    throw "End session error";
  }

  console.log($('#gomain').attr('href'));
  RedirectMain();
}

function SaveToken(userData){
  var token = userData.token;
  $('#token').val(token);
}

function AdjustNavbar(response){

  if(response == null || response == 'undefined'){
    throw "Session is null.";
    return;
  }

  if(response.type == 'customer'){
    return;
  }

  if(response.type == 'manager'){
    AdjustNavbarForManager();
  }

  if(response.type == 'transporter'){
    AdjustNavbarForEmployee();
  }
}

function VerifyManagerSection(type){
  VerifyManagerSectionSession();
}

function VerifyManagerSectionSessionResponse(response){

  console.log("Response to the ajax request - Verify manager section (session)");
  console.log(response);

  if(response.type == 'manager'){
    $("body").find( ".manager-section:hidden" ).each(function(){
      $(this).removeClass('invisible');
      $(this).addClass('visible');
    });
    $("body").find( ".manager-section" ).each(function(){
      $(this).removeClass('invisible');
      $(this).addClass('visible');
    });
  }
  else{
    $("body").find( ".manager-section:hidden" ).each(function(){
      $(this).removeClass('invisible');
      $(this).addClass('visible');
    });
    $("body").find( ".manager-section" ).each(function(){
      console.log('I AM FUCKING CHECKING THIS');
      $(this).removeClass('visible');
      $(this).addClass('invisible');
    });
  }
}
