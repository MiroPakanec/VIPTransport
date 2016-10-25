function AuthenticateUser(session){

  console.log(session.email);
  if(session.email != null && session.email.length >0){
    RedirectHome();
  }
}
