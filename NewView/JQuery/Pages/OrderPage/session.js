function AuthenticateUser(session){

  if(session.email == null || session.email.length == 0){
    RedirectMain();
  }

  AdjustPriviledges(session);
}

function AdjustPriviledges(session){

  if(session.type != 'manager' && session.type != 'transporter'){
    $('#email').prop('disabled', true);
    $('#email').val(session.email);
  };
}
