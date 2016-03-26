$(function (){

  $('#titleOrder').click(function(){

    getTransports(function(data){
      generateTableOrders();
      var added = getParameterByName('added');
      for (index in data){
        generateTableRow(data[index].id ,data[index].date, data[index].from, data[index].to,
          data[index].pasangers, data[index].payment, data[index].creationDate, added);
        added = 0;
      }
    }, ''),

    $(this).css({
      'background-color': 'rgba(255,255,255, 0.05)'
    });
    $('#titleTransport').css({
      'background-color': 'rgba(255,255,255, 0.0)'
    });
    $('#responseArea').slideUp(300).html('');
  }),

  $('#titleTransport').click(function(){

    $('#orderTableArea').html('');

    $(this).css({
      'background-color': 'rgba(255,255,255, 0.05)'
    });
    $('#titleOrder').css({
      'background-color': 'rgba(255,255,255, 0.0)'
    });
    $('#responseArea').slideUp(300).html('');
  }),

  //edit
  $(document).on('click','.editButton',function(){

    var id = $(this).parent().attr('id');
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
    deleteOrder(id);
  })
});

function generateDeleteAlert(id){

  var message = "Are you sure, that you want to delete this order?";
  var html = '<br><input type = "button" id="confirmDelete" class ="alertButton" value="YES">' +
              '<input type="button" id="denyDelete" class ="alertButton" value="NO">' +
              '<input type="hidden" id = "'+id+'" name = "deleteRowId">';
  return message + html;
}

function deleteOrder(id){
  $.ajax({
    url: '../../Server/Responses/deleteOrder.php',
    type: 'POST',
    data: 'id='+id,
    success: function(response){
      handleDeleteResponse(response);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
      alert('Something went wrong...');
    }
  })
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
    //$("#titleOrder").trigger('click');
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
                  '<td>Date</td>' +
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

function generateTableRow(id, date, addressFrom, addressTo, pasangers, payment, creationDate, added){

  var html =      '<tr class = "tableRow" id="'+id+'">' +
                    '<td><input type="text" class="tableInput" name="date" value="'+ date +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="from" value="'+ addressFrom +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="to" value="'+ addressTo +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="pasangers" value="'+ pasangers +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="payment" value="'+ payment +'" disabled></td>' +
                    '<td><input type="text" class="tableInput" name="creationDate" value="'+ creationDate +'" disabled></td>' +
                    '<td class="buttonColumn deleteButton">Delete</td>' +
                    '<td class="buttonColumn editButton">Edit</td>' +
                  '</tr>';

  $('#orderTable').append(html);
  if(added == '1')
    $('#' + id + ' input.tableInput').css({
      'background-color' : 'rgba(255,255,255,0.3)'
    });
}
