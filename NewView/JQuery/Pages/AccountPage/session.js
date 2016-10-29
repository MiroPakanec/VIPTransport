function AuthenticateUser(session){

  if(session.email == null || session.email.length == 0){
    RedirectMain();
  }
  else{
    AdjustPriviledges();
    LoadAccountInformation(session);

    //in communication
    LoadCompany(session.email);
  }
}

function AdjustPriviledges(){

  $("input[name*='email']").prop('disabled', true);
}

function LoadAccountInformation(session){

  $("input[name*='email']").val(session.email);
  $("input[name*='fname']").val(session.fname);
  $("input[name*='mname']").val(session.mname);
  $("input[name*='lname']").val(session.lname);
  $("input[name*='phone']").val(session.phone);
}
