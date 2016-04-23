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
    $('#notificationsLoaded').val('0');

    loadNotificationsAmmount();
    setTimeout(function() {
          $('#allNotifications').trigger('click');
    },10);
});

function loadNotifications(){

  var skip = $('#notificationsLoaded').val();
  var type = $('#notificationsType').val();
  var ammount = 10;

  getNotifications(function(data){

      for (var notificationIndex in data) {

        processNotification(data[notificationIndex]);
      }

      setNotificationsIcons();

  }, ammount, skip, type);
}

function setNotificationsIcons(){

  $('.notificationContainer').each(function(){
    var element = $(this).next();
    var value = $(this).next().find(">:first-child").val();

    setIcon(element, value);
  })
}

function setIcon(element, value){

  if(value === 'false')
    $(element).css({
      'background-image': 'url("../Css/Images/notificationIcon/checked_checkbox.png")'
    })
  else
    $(element).css({
      'background-image': 'url("../Css/Images/notificationIcon/unchecked_checkbox.png")'
    })

}

function setBackground(element, value){

  if(value === 'true')
    $(element).css({
      'background-color': 'rgba(255, 255, 255, 0.1)'
    })
  else
    $(element).css({
      'background-color': 'rgba(0, 0, 0, 0.5)'
    })
}

function markNotificationsRead(element, value){

  var postData = {};
  var id = $(element).prev().attr('id');

  postData['id'] = id;
  postData['value'] = value;

  readNotifications(function(data){

    loadNotificationsAmmount();
    setIcon(element, value);
    setBackground(element, value);
    setBackground($(element).prev(), value);
  }, postData);
}

function markAllNotificationsRead(element, value){

  readAllNotifications(function(data){

    loadNotificationsAmmount();

    setTimeout(function() {
          $('#allNotifications').trigger('click');
    },10);
  });
}

function processNotification(notification){

  var id = notification['_id'];

  if(notificationExists(id)){
    console.log(notification['user']['type'] + ' already exists');
    return;
  }

  var message = generateNotificationMessage(notification);
  if(notification['read'] == false)
    var html = generateNewNotificationHtml(message, id);
  else
    var html = generateOldNotificationHtml(message, id);

  $('#notificationsArea').append(html);
}

function notificationExists(id){

  var counter = 0;
  var found = false;

  $('#notificationsArea').children('.notificationContainer').each(function(){

    if($(this).attr('id') == id)
      found = true;

    counter++;
  })

  return found;
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

function generateNewNotificationHtml(message, id){

  var html = '<div class="smallText notificationContainer " id="' + id + '" style="background-color : rgba(255, 255, 255, 0.1)">' +
                '<div class="smallText notificationText">' +
                  message +
                '</div>' +
             '</div>' +
             '<div class="notificationConfirm" style="background-color : rgba(255, 255, 255, 0.1)">' +
              '<input type="hidden" value="true">' +
             '</div>';

  return html;
}

function generateOldNotificationHtml(message, id){

  var html = '<div class="smallText notificationContainer" id="' + id + '" style="background-color : rgba(0, 0, 0, 0.5)">' +
                '<div class="smallText notificationText">' +
                  message +
                '</div>' +
              '</div>' +
              '<div class="notificationConfirm" style="background-color : rgba(0, 0, 0, 0.5)">' +
                '<input type="hidden" value="false">' +
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
