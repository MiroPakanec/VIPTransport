$(function(){
  setInterval(function(){
    loadNotificationsAmmount();
  }, 2000);

});

function loadNotificationsAmmount(){

  getNotificationsAmmount(function(data){

    var length = data.length;
    if(length > 0 && length < 20){
      data = data.substring(data.indexOf('(')+1, data.lastIndexOf(')'));


      $('.notificationAmmount').html(data);
    }

  });
}
