$(function(){

    hideElementsOnload();

    getSession(function(data){

      if(data.email.length == 0)
        window.location="mainPage.html";

      if(data.type == 'customer')
        generateCustomerButtons();
      else if(data.type == 'manager')
        generateManagerButtons();

    $('.notificationAmmount').html('0');
    $('#notificationsLoaded').val('0');

    loadNotificationsAmmount();
    loadButtons(data.type);
    loadDetails();
  });
});

function hideElementsOnload(){

  $('.outputArea').hide();
}

function loadButtons(sessionType){

  if(getParameterByName('type') == 'order' && sessionType == 'manager')
    generateManagerNotificationButtons();

}

function generateManagerNotificationButtons(){

  var html = '<input type="button" class="buttonHome notificationButton buttonText" id="updateButton" value="Update">' +
             '<input type="button" class="buttonHome notificationButton buttonText" id="deleteButton" value="Delete">';

  $('.notificationButtonArea').append(html);
}

function loadDetails(){

  var id = getParameterByName('id');
  var type = getParameterByName('type');

  switch(type){

    case 'order' : loadOrder(id); break;
    case 'user'  : loadUser(id); break;

  }
}

function loadUser(id){

  var email = id.substring(id.indexOf('(')+1, id.lastIndexOf(')'));
  if(id == 'you')
    email = 'you';

  getUserData(function(dataUser){

    if(dataUser.length == 0){

      processEmpty();
      return;
    }
    processUser(dataUser);
  }, email);
}

function loadOrder(id){

  getTransports(function(dataOrder){

    if(dataOrder.length == 0){

      processEmpty();
      return;
    }
    processOrder(dataOrder);
  }, id, '', '', '');


  getOrderNames(function(dataNames){

    setTimeout(function() {

        if(dataNames.length == 0){

          processEmpty();
          return;
        }
        processNames(dataNames);
    },30);
  }, id);
}

function processEmpty(){

  $('#notificationsArea').html('</br>This notification points to something that no longer exists in out system.');
}

function processUser(data){

  var html = '';

  html += generateRow('Email:', data.email);
  html += generateRow('First name:', data.fname);
  html += generateRow('Middle name:', data.mname);
  html += generateRow('Last name:', data.lname);
  html += generateRow('Phone:', data.phone);
  html += generateRow('Type:', data.type);
  html += generateRow('Registered:', data.registrationDate);

  $('#notificationsArea').append(html);
}

function processOrder(data){

  var html = '';
  var order = data[0];

  html += generateRow('ID:', order.id);
  html += generateRow('Date:', order.date);
  html += generateRow('From:', order.from);
  html += generateRow('To:', order.to);
  html += generateRow('Payment type:', order.payment);
  html += generateRow('Phone:', order.phone);
  html += generateRow('Created:', order.creationDate);
  html += generateRow('Status:', order.status);
  html += generateRow('Pasangers:', order.pasangers);

  $('#notificationsArea').append(html);
}

function processNames(names){

  var html = '';

  html += generateRow('', '');
  names.forEach(function (value, i) {

    html += generateRow('Name' + (i + 1), value);
  });

  $('#notificationsArea').append(html);
}

function generateRow(key, value){

  var html = '<div class="detailsRow"> ' +
                '<div class="rowTitle">'+key+'</div>' +
                '<div class="rowValue">'+value+'</div>' +
              '</div>';

  return html;
}
