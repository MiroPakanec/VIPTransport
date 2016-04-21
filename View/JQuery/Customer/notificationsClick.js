$(function (){

  $('#allNotifications').on('click', function(){

    $('#notificationsArea').html('');
    $('#notificationsLoaded').val('0');
    $('#notificationsType').val('all');
    highLightButton('#allNotifications', '#unreadNotifications');
    loadNotifications();
  }),

  $('#unreadNotifications').on('click', function(){

    $('#notificationsArea').html('');
    $('#notificationsLoaded').val('0');
    $('#notificationsType').val('unread');
    highLightButton('#unreadNotifications', '#allNotifications');
    loadNotifications();
  }),

  $('#mark').on('click', function(){

    markAllNotificationsRead();
  }),

  $('#notifications').on('click', function(){
    window.location="notificationsPage.html";
  }),

  $(document).on('click','.notificationConfirm',function(){
    var element = $(this);
    var dependencyElement = $(element).find(">:first-child");
    var dependencyElementValue = negate($(dependencyElement).val());

    $(dependencyElement).val(dependencyElementValue);
    markNotificationsRead(element, dependencyElementValue);
  })

  $('#moreNotifications').on('click', function(){

    var skip = parseInt($('#notificationsLoaded').val());
    skip += 10;
    $('#notificationsLoaded').val(skip);
    loadNotifications();

    setTimeout(function() {
          //markNotificationsRead();
    },100);
  })
});

function highLightButton(button1, button2){

  $(button1).css({
    'background-color' : 'rgba(255,255,255,0.3)'
  });

  $(button2).css({
    'background-color' : 'rgba(255,255,255,0)'
  });
}

function negate(value){

  if(value === 'true')
    return 'false';
  else if(value === 'false')
    return 'true';

  return -1;
}
