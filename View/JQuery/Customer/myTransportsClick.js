$(function(){

  $('#titleTransport').click(function(){

    closeElementsOnLoadTransport();
    closeSubElementsOnLoad();
    generateTableTransports();
    loadTransports();
  });
});

function closeElementsOnLoadTransport(){

  $('#orderTableArea').html('');
  $('.orderSearchBarArea').slideUp(500);
  manageTitleCss('#titleTransport', '#titleOrder', '#titleRoutes', '0.05');
}

function generateTableTransports(){

  $('#orderTableArea').html('');
  var html = '<table class="smallText" id="transportsTable">' +
                '<tr class = "tableHeader">' +
                  '<td class="idCol">ID</td>' +
                  '<td class="dateColRoute">Date</td>'+
                  '<td>From</td>'+
                  '<td>To</td>'+
                  '<td>Pasangers</td>'+
                  '<td>Payment</td>'+
                  '<td>Created</td>'+
                '</tr>';

   $('#orderTableArea').html(html);
}

function loadTransports(){

  getFinishedTransports(function(data){
    console.log(data);
    for (index in data){
      generateTableRowTransport(data[index].id ,data[index].date, data[index].from, data[index].to,
        data[index].pasangers, data[index].payment, data[index].creationDate);
    }
  });
}

function generateTableRowTransport(id, date, addressFrom, addressTo, pasangers, payment, creationDate){

  var html =        '<tr class = "tableRow" id="'+id+'">' +
                      '<td><input type="text" class="tableInput tableInputSmall" name="date" value="'+ id +'" disabled></td>' +
                      '<td><input type="text" class="tableInput" name="date" value="'+ date +'" disabled></td>' +
                      '<td><input type="text" class="tableInput" name="from" value="'+ addressFrom +'" disabled></td>' +
                      '<td><input type="text" class="tableInput" name="to" value="'+ addressTo +'" disabled></td>' +
                      '<td><input type="text" class="tableInput" name="pasangers" value="'+ pasangers +'" disabled></td>' +
                      '<td><input type="text" class="tableInput" name="payment" value="'+ payment +'" disabled></td>' +
                      '<td><input type="text" class="tableInput" name="creationDate" value="'+ creationDate +'" disabled></td>'+
                    '</tr>';
  $('#transportsTable').append(html);
}
