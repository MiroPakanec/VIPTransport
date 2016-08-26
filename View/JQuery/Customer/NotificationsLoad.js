$(function(){

    getSession(function(data){

      if(data.email.length == 0)
        window.location="mainPage.html";

      if(data.type == 'customer')
        generateCustomerButtons();
      else if(data.type == 'manager')
        generateManagerButtons();
      else if(data.type == 'transporter')
        generateTransporterButtons();
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
      setHeights();

  }, ammount, skip, type);
}

function setHeights(){

  $('.notificationContainer').each(function(){
    var height = $(this).css('height');
    $(this).next().css({
      'height' : height
    });
  })
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
  var message = notification['text'];
  var date = notification['date'];
  var read = notification['read'];
  var type = notification['type'];
  var userMessage = notification['message'];
  var action = notification['action'];
  var html = '';

  if(notificationExists(id)){return; }

  date = relative_time(date);
  if(type == 'order')
    message = modifyOrderMessageHtml(message, type);
  else if(type == 'route employee' || type == 'route customer')
    message = modifyRouteMessageHtml(message, type);

  userMessage = modifyUserMessageHtml(userMessage, action);
  message += '</br>' + userMessage + '</br>' + date;
  html = generateNotficationHtml(message, id, read);

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

function generateNotficationHtml(message, id, read){

  if(read == false)
    return generateNewNotificationHtml(message, id);
  else
    return generateOldNotificationHtml(message, id);
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

function relative_time(date_str) {
    if (!date_str) {return;}
    date_str = $.trim(date_str);
    date_str = date_str.replace(/\.\d\d\d+/,""); // remove the milliseconds
    date_str = date_str.replace(/-/,"/").replace(/-/,"/"); //substitute - with /
    date_str = date_str.replace(/T/," ").replace(/Z/," UTC"); //remove T and substitute Z with UTC
    date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // +08:00 -> +0800

    var parsed_date = new Date(date_str);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
    var delta = parseInt((relative_to.getTime()-parsed_date)/1000);
    delta=(delta<2)?2:delta;
    var r = '';
    if (delta < 60) {
    r = delta + ' seconds ago';
    } else if(delta < 120) {
    r = 'a minute ago';
    } else if(delta < (45*60)) {
    r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
    } else if(delta < (2*60*60)) {
    r = 'an hour ago';
    } else if(delta < (24*60*60)) {
    r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
    } else if(delta < (48*60*60)) {
    r = 'a day ago';
    } else {
    r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
    }
    return 'about ' + r;
};

function modifyUserMessageHtml(message, action){

  if(!message) {return ' ';}
  if(message.length <= 0) {return ' '}
  if (!/update request/i.test(action) && !/register/i.test(action) && !/update transporter/i.test(action)) {return ' '}

  message = message.splice(0, 0, '<strong>Message: </strong>');
  if(message.length <= 95) {return message}

  if(!message.indexOf('href'))
    message = message.splice(130, 0, '</br>');

  else
    message = message.splice(120, 0, '</br>');

  return message;
}

function modifyOrderMessageHtml(message){

  if(!message) {return;}
  var url = '#';
  var index, index2, index3, id = -1;

  //find indexes for user identification and ID
  index = message.indexOf("has ");
  if(index == -1){index = message.indexOf("have ");}
  index2 = message.indexOf("ID");
  index2 += 3;
  index3 = message.length -1;

  //get ID , form URL
  id = message.substring(index2, index3);
  user = message.substring(0, index);

  url = "notificationDetailPage.html";

  //modify message
  message = message.splice( index3, 0, "</a></strong>");
  message = message.splice( index2, 0, '<strong><a href="'+ url + "?type=order&id="+id +'">');
  message = message.splice(index, 0, "</a></strong>");
  message = message.splice(0, 0, '<strong><a href="'+ url + "?type=user&id="+user +'">');

  return message;
}

function modifyRouteMessageHtml(message, type){

  if(!message) {return;}
  var url = '#';
  var index, index2, index3, id = -1;

  //find indexes for user identification and ID
  index = message.indexOf("has ");
  if(index == -1){index = message.indexOf("have ");}
  index2 = message.indexOf("order ID");
  index2 += 9;
  index3 = message.indexOf("Please have");
  index3 -= 3;
  index4 = message.indexOf("DETAILS");
  index5 = index4 + 7;

  //get ID , form URL
  id = message.substring(index2, index3);
  user = message.substring(0, index);

  url = "notificationDetailPage.html";

  if(type == 'route employee'){

    message = message.splice( index5, 0, "</a></strong>");
    message = message.splice( index4, 0, '<strong><a href="'+ url + "?type=route&id="+id +'">');
  }

  message = message.splice(index, 0, "</a></strong>");
  message = message.splice(0, 0, '<strong><a href="'+ url + "?type=user&id="+user +'">');

  return message;
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
