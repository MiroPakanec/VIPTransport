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
  LoadRoutes();
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
  DisableFutureRoutesConfirmation();
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
        '<th>R-ID</th>' +
        '<th>O-ID</th>' +
        '<th>Date</th>' +
        '<th>Time</th>' +
        '<th></th>' +
        '<th></th>' +
        '<th></th>' +
      '</tr>' +
    '</thead>';

    return html;
}

function GenerateLargeTableHead(){
  var html =
  '<thead>' +
      '<tr>' +
        '<th>R-ID</th>' +
        '<th>O-ID</th>' +
        '<th>Date</th>' +
        '<th>Time</th>' +
        '<th>Transporter</th>' +
        '<th>Car</th>' +
        '<th>Countries</th>' +
        '<th></th>' +
        '<th></th>' +
        '<th></th>' +
      '</tr>' +
    '</thead>';

    return html;
}

function GenerateLargeTableBody(tableData){

  var buttonsHtml = GenerateTableButtons();

  var html = '';
  for (index in tableData){

    var datetime = new Date(tableData[index][2]);
    var time = GetTimeFromDatetimeObject(datetime);
    var date = GetDateString(datetime);

    html +=
      '<tr>' +
        '<td class="row-route-id">'+tableData[index][0]+'</td>' +
        '<td class="row-id">'+tableData[index][1]+'</td>' +
        '<td class="row-date">'+date+'</td>' +
        '<td>'+time+'</td>' +
        '<td>'+tableData[index][3]+'</td>' +
        '<td>'+tableData[index][4]+'</td>' +
        '<td>'+tableData[index][5]+'</td>' +
        buttonsHtml +
      '</tr>';
  }

  return html;
}

function GenerateSmallTableBody(tableData){

  var buttonsHtml = GenerateTableButtons();

  var html = '';
  for (index in tableData){

    var datetime = new Date(tableData[index][2]);
    var time = GetTimeFromDatetimeObject(datetime);
    var date = GetDateString(datetime);

    html +=
      '<tr>' +
        '<td class="row-route-id">'+tableData[index][0]+'</td>' +
        '<td class="row-id">'+tableData[index][1]+'</td>' +
        '<td class="row-date">'+date+'</td>' +
        '<td>'+time+'</td>' +
        buttonsHtml +
      '</tr>';
  }

  return html;
}


function GenerateTableButtons(){

  /*ADD DELETE ROUTE*/

  var html =
  '<td>' +
    '<button class="btn-table btn-table-remove route-data" resource-data="data-delete-order" data-toggle="modal" data-target="#confirm-delete" type="button" title="Delete order">' +
      '<span class="glyphicon glyphicon-medium glyphicon-remove"></span>' +
    '</button>' +
  '</td>' +
  '<td>' +
    '<button class="btn-table btn-table-expand route" resource="order-confirm" type="button" title="View order details">' +
      '<span class="glyphicon glyphicon-medium glyphicon-fullscreen"></span>' +
    '</button>' +
  '</td>' +
  '<td class="cell-confirm">' +
    '<button class="btn-table btn-table-confirm route" resource="route-confirm" type="button" title="Confirm order">' +
      '<span class="glyphicon glyphicon-medium glyphicon-ok"></span>' +
    '</button>' +
  '</td>';

  return html;
}
