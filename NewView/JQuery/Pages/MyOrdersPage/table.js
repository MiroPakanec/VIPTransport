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
}

function GenerateSmallTable(){

  var tableHead = GenerateSmallTableHead();
  var html =
    '<table class="table table-hover table-bordered table-center table-dark table-text-extrasmall table-sm">' +
        tableHead +
        '<tbody>' +
          '<tr>' +
            '<td class="col-xs-1 row-id">213</td>' +
            '<td class="col-xs-3">20th October 2016</td>' +
            '<td class="col-xs-4">Zilina Velka Okruzna</td>' +
            '<td class="col-xs-4">Jernbanegade 12A</td>' +
            '<td>' +
              '<button class="btn-table btn-table-remove route-data" resource-data="data-delete-order" data-toggle="modal" data-target="#confirm-delete" type="button">' +
                '<span class="glyphicon glyphicon-medium glyphicon-remove"></span>' +
              '</button>' +
            '</td>' +
            '<td>' +
              '<button class="btn-table btn-table-expand route" resource="order" type="button">' +
                '<span class="glyphicon glyphicon-medium glyphicon-zoom-in"></span>' +
              '</button>' +
            '</td>' +
            '<td>' +
              '<button class="btn-table btn-table-confirm route" resource="order-confirm" type="button">' +
                '<span class="glyphicon glyphicon-medium glyphicon-ok"></span>' +
              '</button>' +
            '</td>' +
          '</tr>' +
        '</tbody>' +
    '</table>';

  return html;
}

function GenerateLargeTable(){

  var tableHead = GenerateLargeTableHead();
  var html =
  '<table class="table table-hover table-bordered table-center table-dark table-text-small">' +
      tableHead +
      '<tbody>' +
        '<tr>' +
          '<td class="row-id">213</td>' +
          '<td>20th October 2016</td>' +
          '<td>20:00</td>' +
          '<td>Zilina Velka Okruzna</td>' +
          '<td>Jernbanegade 12A</td>' +
          '<td>4</td>' +
          '<td>Cash</td>' +
          '<td>15th October 2016</td>' +
          '<td>' +
            '<button class="btn-table btn-table-remove route-data" resource-data="data-delete-order" data-toggle="modal" data-target="#confirm-delete" type="button">' +
              '<span class="glyphicon glyphicon-medium glyphicon-remove"></span>' +
            '</button>' +
          '</td>' +
          '<td>' +
            '<button class="btn-table btn-table-expand route" resource="order" type="button">' +
              '<span class="glyphicon glyphicon-medium glyphicon-zoom-in"></span>' +
            '</button>' +
          '</td>' +
          '<td>' +
            '<button class="btn-table btn-table-confirm route" resource="order-confirm" type="button">' +
              '<span class="glyphicon glyphicon-medium glyphicon-ok"></span>' +
            '</button>' +
          '</td>' +
        '</tr>' +
      '</tbody>' +
  '</table>';

  return html;
}

function GenerateSmallTableHead(){
  var html =
  '<thead>' +
      '<tr>' +
        '<th>Id</th>' +
        '<th>Date</th>' +
        '<th>From</th>' +
        '<th>To</th>' +
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
        '<th>Id</th>' +
        '<th>Date</th>' +
        '<th>Hour</th>' +
        '<th>From</th>' +
        '<th>To</th>' +
        '<th>Pasangers</th>' +
        '<th>Payment</th>' +
        '<th>Created</th>' +
        '<th></th>' +
        '<th></th>' +
        '<th></th>' +
      '</tr>' +
    '</thead>';

    return html;
}
