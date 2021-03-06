function GenerateTable(){

  var viewport = GetViewPort();
  var tableHtml;
  switch(viewport){

    case 'xs':
      tableHtml = GenerateSmallTable();
      break;
    case 'sm':
      tableHtml = GenerateSmallTable();
      break;
    case 'md':
      tableHtml = GenerateLargeTable();
      break;
    case 'lg':
      tableHtml = GenerateLargeTable();
      break;
default:
    throw "Unable to detect screen viewport.";
  }

  $('.table-responsive').html(tableHtml);
  //LoadOrders();
  LoadTransports();
}

function GenerateTableBody(tableData){

  var viewport = GetViewPort();
  var tableBodyHtml;
  switch(viewport){

    case 'xs':
      tableBodyHtml = GenerateSmallTableBody(tableData);
      break;
    case 'sm':
      tableBodyHtml = GenerateSmallTableBody(tableData);
      break;
    case 'md':
      tableBodyHtml = GenerateLargeTableBody(tableData);
      break;
    case 'lg':
      tableBodyHtml = GenerateLargeTableBody(tableData);
      break;
default:
    throw "Unable to detect screen viewport.";
  }

  $('tbody').html(tableBodyHtml);
  LoadRoutesJson();
}

function GenerateSmallTable(){

  var tableHead = GenerateSmallTableHead();
  var html =
    '<table class="table table-hover table-bordered table-center table-dark table-text-extrasmall table-sm">' +
        tableHead +
        '<tbody>' +
        '</tbody>' +
    '</table>';

  return html;
}

function GenerateLargeTable(){

  var tableHead = GenerateLargeTableHead();
  var html =
  '<table class="table table-hover table-bordered table-center table-dark table-text-extrasmall">' +
      tableHead +
      '<tbody>' +
      '</tbody>' +
  '</table>';

  return html;
}

function GenerateSmallTableHead(){
  var html =
  '<thead>' +
      '<tr>' +
        '<th>Order ID</th>' +
        '<th>Date</th>' +
        '<th>From</th>' +
        '<th>To</th>' +
      '</tr>' +
    '</thead>';

    return html;
}

function GenerateLargeTableHead(){
  var html =
  '<thead>' +
      '<tr>' +
        '<th>Order ID</th>' +
        '<th>Date</th>' +
        '<th>Hour</th>' +
        '<th>From</th>' +
        '<th>To</th>' +
        '<th>Price(EUR)</th>' +
        '<th>Duration</th>' +
        '<th>Distance(KM)</th>' +
      '</tr>' +
    '</thead>';

    return html;
}

function GenerateLargeTableBody(tableData){

  var buttonsHtml = GenerateTableButtons();

  var html = '';
  for (index in tableData){

    var datetime = GetDateFromPHP(tableData[index].date);
    var time = GetTimeFromDatetimeObject(datetime);
    var date = GetDateString(datetime);

    html +=
      '<tr>' +
        '<td class="row-id">'+tableData[index].orderId+'</td>' +
        '<td>'+date+'</td>' +
        '<td>'+time+'</td>' +
        '<td>'+tableData[index].from+'</td>' +
        '<td>'+tableData[index].to+'</td>' +
        '<td>'+tableData[index].price+'</td>' +
        '<td>'+tableData[index].duration+'</td>' +
        '<td>'+tableData[index].distance+'</td>' +
        buttonsHtml +
      '</tr>';
  }

  return html;
}

function GenerateSmallTableBody(tableData){

  var buttonsHtml = GenerateTableButtons();
  var html = '';
  for (index in tableData){

    var datetime = GetDateFromPHP(tableData[index].date);
    var date = GetDateString(datetime);

    html +=
      '<tr>' +
        '<td class="col-xs-1 row-id">'+tableData[index].orderId+'</td>' +
        '<td class="col-xs-3">'+date+'</td>' +
        '<td class="col-xs-4">'+tableData[index].from+'</td>' +
        '<td class="col-xs-4">'+tableData[index].to+'</td>' +
        buttonsHtml +
      '</tr>';
  }

  return html;
}

function GenerateTableButtons(){

}
