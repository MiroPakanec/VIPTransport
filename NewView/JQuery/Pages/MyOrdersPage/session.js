function AuthenticateUser(session){

  if(session.email == null || session.email.length == 0){
    RedirectMain();
  }
}
