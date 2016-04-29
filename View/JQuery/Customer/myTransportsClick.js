$(function (){

  $('#notifications').on('click', function(){
    window.location="notificationsPage.html";
  }),

  $('#titleOrder').click(function(){

    loadSearchBar();
    generateTableOrders();

    getTransports(function(data){

      var added = getParameterByName('added');
      var updated= getParameterByName('updated');
      for (index in data){
        generateTableRow(data[index].id ,data[index].date, data[index].from, data[index].to,
          data[index].pasangers, data[index].payment, data[index].creationDate, data[index].status, added, updated);

        added = '-1';
      }
    }, $('#idRequest').val(), $('#dateFromRequest').val() , $('#dateToRequest').val() , $('#emailRequest').val()),

    manageTitleCss('#titleOrder', '#titleTransport', '0.05');

    $('#responseArea').slideUp(300).html('');
  }),

  $('#titleTransport').click(function(){

    $('#orderTableArea').html('');
    $('.orderSearchBarArea').slideUp(500);

    manageTitleCss('#titleTransport', '#titleOrder', '0.05');
    $('#responseArea').slideUp(300).html('');
  }),

  //edit
  $(document).on('click','.editButton',function(){

    var id = $(this).parent().attr('id');
    var buttonValue = $(this).html();

    if(buttonValue === 'Update request')
      updateRequest(id);
    else if(buttonValue === 'Update')
      window.location = "newOrderPage.html?update=1&id="+id;
  }),

  //delete
  $(document).on('click','.deleteButton',function(){

    var id = $(this).parent().attr('id');
    //put id into the hidden field
    var alertText = generateDeleteAlert(id);

    $('#responseArea').html(alertText).css({
      'background-color' : 'rgba(255,255,255,0.1)',
      'color' : 'white',
      'border' : '1px solid rgba(255,255,255,0.3)'
    }).html(alertText).slideDown(500);
  }),

  $(document).on('click','#denyDelete',function(){

    $('#responseArea').html('').slideUp(300);
  }),

  $(document).on('click','#confirmDelete',function(){

    id = $("input[name='deleteRowId']").attr('id');

    deleteOrder(function(data){

        handleDeleteResponse(data);
    },id);
  }),

  $(document).on('click','#cancelRequest',function(){

    $('#responseArea').html('').slideUp(300);
  }),

  $(document).on('click','#sendRequest',function(){

    var id = $("input[name='updateRowId']").attr('id');
    var text = $('#updateRequestTextArea').val();

    if(text.length > 0)
      requestOrderUpdate(id, text);
  })
});

function manageTitleCss(id, id2, opacity){

  $(id).css({
    'background-color': 'rgba(255,255,255, '+opacity+')'
  });
  $(id2).css({
    'background-color': 'rgba(255,255,255, 0.0)'
  });
}

function updateRequest(id){

  var messageHtml = generateUpdateMessageField(id);

  $('#responseArea').html(messageHtml).css({
    'background-color' : 'rgba(255,255,255,0.1)',
    'color' : 'white',
    'border' : '1px solid rgba(255,255,255,0.3)',
    'font-size' : '15px',
    'height' : '15%'
  }).html(messageHtml).slideDown(500);
}

function generateUpdateMessageField(id){

  var message = "This order (ID: "+id+") has already been confirmed.</br> " +
                "Please send a message to the manager and you will be notified about the changes shortly.</br>" +
                "What would you like to change about the order?";

  var html = '<textarea rows="3" cols="300" maxlength="150" id="updateRequestTextArea" autofocus placeholder="Example: Departure address - Veľká Okružná 2733/59, 010 01 Žilina, Slovakia"></textarea>' +
             '<input type="button" id="sendRequest" class ="alertButton" value="Send">' +
             '<input type="button" id="cancelRequest" class ="alertButton" value="Cancel">' +
             '<input type="hidden" id = "'+id+'" name = "updateRowId">';
  return message + html;
}

function generateDeleteAlert(id){

  var message = "Are you sure, that you want to delete this order?";
  var html = '<br><input type = "button" id="confirmDelete" class ="alertButton" value="YES">' +
              '<input type="button" id="denyDelete" class ="alertButton" value="NO">' +
              '<input type="hidden" id = "'+id+'" name = "deleteRowId">';
  return message + html;
}

function requestOrderUpdate(id, message){

  var data = {};
  data['id'] = id;
  data['message'] = message;

  $.ajax({
    url: '../../Server/Responses/requestOrderUpdate.php',
    type: 'POST',
    data: data,
    success: function(response){
      console.log(response);
      handleRequestUpdateResnpose(response);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
      alert('Something went wrong...');
    }
  })
}

function handleRequestUpdateResnpose(response){

  var responseText;
  $('#responseArea').html('');

  if(response == 1){

    responseText = 'Update request was sent successfully.';
    $('#responseArea').css({
      'background-color' : 'rgba(0,255,0,0.1)',
      'color' : 'green',
      'border' : '1px solid rgba(0,255,0,0.3)'
    }).html(responseText).slideDown(500);
  }
  else{

    responseText = 'We are sorry, update request could not be processed. Please try again later.';
    $('#responseArea').css({
      'background-color' : 'rgba(255,0,0,0.1)',
      'color' : 'red',
      'border' : '1px solid rgba(255,0,0,0.3)'
    }).html(responseText).slideDown(500);
  }
}

function handleDeleteResponse(response){

  var responseText;
  id = $("input[name='deleteRowId']").attr('id');
  $('#responseArea').html('');

  if(response == 1){

    responseText = 'Order was successfully deleted';
    $('#responseArea').css({
      'background-color' : 'rgba(0,255,0,0.1)',
      'color' : 'green',
      'border' : '1px solid rgba(0,255,0,0.3)'
    }).html(responseText).slideDown(500);
    $('tr#'+id).remove();
  }
  else if(response == 2){

    responseText = 'Order has already been confirmed.</br>Request has been sent to the manager and you will be notified shortly about the confirmation.';
    $('#responseArea').css({
      'background-color' : 'rgba(255,255,255,0.1)',
      'color' : 'white',
      'border' : '1px solid rgba(255,255,255,0.3)'
    }).html(responseText).slideDown(500);
  }
  else{

    responseText = 'We are sorry, order could not be deleted...';
    $('#responseArea').css({
      'background-color' : 'rgba(255,0,0,0.1)',
      'color' : 'red',
      'border' : '1px solid rgba(255,0,0,0.3)'
    }).html(responseText).slideDown(500);
  }
}


function generateTableOrders(){

  var html = '<table class="smallText" id="orderTable">' +
                '<tr class = "tableHeader">' +
                  '<td class="idCol">ID</td>' +
                  '<td class="dateCol">Date</td>' +
                  '<td>Departure address</td>' +
                  '<td>Arrival address</td>' +
                  '<td>Pasangers</td>' +
                  '<td>Payment</td>' +
                  '<td>Created</td>' +
                  '<td class="buttonColumnHeader"></td>' +
                  '<td class="buttonColumnHeader"></td>' +
                '</tr>';

   $('#orderTableArea').html(html);
}

function generateTableRow(id, date, addressFrom, addressTo, pasangers, payment, creationDate, status, added, updated){

  var deleteButtonValue = generateButtonName(status, 'Delete');
  var updateButtonValue = generateButtonName(status, 'Update');

  var html =      '<tr class = "tableRow" id="'+id+'">' +
                    '<td><input type="text" class="tableInput tableInputSmall" name="date" value="'+ id +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="date" value="'+ date +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="from" value="'+ addressFrom +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="to" value="'+ addressTo +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="pasangers" value="'+ pasangers +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="payment" value="'+ payment +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="creationDate" value="'+ creationDate +'" disabled></td>' +
                    '<td class="buttonColumn deleteButton">'+deleteButtonValue+'</td>' +
                    '<td class="buttonColumn editButton">'+updateButtonValue+'</td>' +
                  '</tr>';

  $('#orderTable').append(html);
  if(added == '0')
    $('#' + id + ' input.tableInput').css({
      'background-color' : 'rgba(255,255,255,0.3)'
    });
  else if(id == updated){
    $('#' + id + ' input.tableInput').css({
      'background-color' : 'rgba(255,255,255,0.3)'
    });
  }
}

function generateButtonName(status, defaultValue){

  if(status != 'Stand by' && ($('#type').val()) != 'manager'){

    return defaultValue + ' request';
  }

  return defaultValue;
}
