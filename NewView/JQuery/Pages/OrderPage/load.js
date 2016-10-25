$(function(){
  LoadSession();
  
  GenerateNavbar();
  GenerateFooter();

  if(!IsNewOrder()){
    LoadOrder();
    //LoadNames();
  }
});

function IsNewOrder(){

  var url = window.location.href;
  var urlParams = URLToArray(url);

  if("id" in urlParams){
    return false;
  }
  return true;
}
