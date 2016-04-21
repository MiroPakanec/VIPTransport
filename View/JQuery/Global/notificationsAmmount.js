$(function(){

  setInterval(function(){
    loadNotificationsAmmount();
  }, 5000);

});

function loadNotificationsAmmount(){

  getNotificationsAmmount(function(data){

    $('.notificationAmmount').html(data);
  });
}
