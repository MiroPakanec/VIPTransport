$(function(){

    getSession(function(data){

      if(data.email.length == 0){
          window.location="mainPage.html";
      }

      if(data.type == 'customer'){

        //generate page for custoemr
        generateCustomerButtons();
      }
    }),

    $('.notificationAmmount').html('0');

    getNotificationsAmmount(function(data){

      $('.notificationAmmount').html(data);
    }),

    getNotifications(function(data){

        for (var notificationIndex in data) {

          processNotification(data[notificationIndex]);
        }
    }, 15);

    readNotifications(function(data){

    });

});

function processNotification(notification){

  var message = generateNotificationMessage(notification);
  if(notification['read'] == false)
    var html = generateNewNotificationHtml(message);
  else
    var html = generateOldNotificationHtml(message);

  $('#notificationsArea').append(html);
}

function generateNotificationMessage(notification){

  var message = notification['user']['type'] + ' '
          + "<b>" + notification['user']['name'] + ' '
          + notification['user']['surname'] + '</b>' + ' has '
          + "<b>" + notification['action'] + '</b>'  + ' ';

  if(notification['order'] != null)
    return message + generateOrderMessage(notification);
  else if(notification['transport'] != null)
    return message + generateTransportMessage(notification);
}

function generateNewNotificationHtml(message){

  var html = '<div class="smallText notificationContainer" style="background-color : rgba(255, 255, 255, 0.1)">' +
                '<div class="smallText notificationText">' +
                  message +
                '<div>' +
             '</div>';

  return html;
}

function generateOldNotificationHtml(message){

  var html = '<div class="smallText notificationContainer" style="background-color : rgba(0, 0, 0, 0.5)">' +
                '<div class="smallText notificationText">' +
                  message +
                '<div>' +
             '</div>';

  return html;
}

function generateOrderMessage(notification){

  return    'an <b>order</b> from ' + notification['order']['from'] + ' '
          + 'to ' + notification['order']['to'] + ' '
          + 'scheduled at ' + notification['order']['datetime'] + '<br>'
          + 'date : ' + notification['date'];
}

function generateTransportMessage(message){

  return 'TRANSPORT!';
}
