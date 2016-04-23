$(function(){
  setInterval(function(){
    loadNotificationsAmmount();
  }, 2000);

});

function loadNotificationsAmmount(){

  getNotificationsAmmount(function(data){

    var length = data.length;
    if(length > 0 && length < 20){

      console.log(data);
      data = data.substring(data.indexOf('(')+1, data.lastIndexOf(')'));
      console.log(data);

      $('.notificationAmmount').html(data);
    }

  });
}
