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
  LoadCars();
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

  $('#tbody-cars').html(tableBodyHtml);
  LoadRoutesJson();
}

function GenerateLargeTable(){
  throw "unimplemented excetion";
}

function GenerateSmallTable(){

  var tableHead = GenerateSmallTableHead();
  var html =
    '<table class="table table-hover table-bordered table-center table-dark table-text-extrasmall table-sm">' +
        tableHead +
        '<tbody id="tbody-cars">' +
        '</tbody>' +
    '</table>';

  return html;
}

function GenerateLargeTable(){

  var tableHead = GenerateLargeTableHead();
  var html =
  '<table class="table table-hover table-bordered table-center table-dark table-text-extrasmall">' +
      tableHead +
      '<tbody id="tbody-cars">' +
      '</tbody>' +
  '</table>';

  return html;
}

function GenerateSmallTableHead(){
  var html =
  '<thead>' +
      '<tr>' +
      '<th class="col-xs-3 row-id">Spz</th>' +
      '<th class="col-xs-3">Type</th>' +
      '<th class="col-xs-4">State</th>' +
      '<th class="col-xs-1"></th>' +
      '<th class="col-xs-1"></th>' +
      '</tr>' +
    '</thead>';

    return html;
}

function GenerateLargeTableHead(){
  var html =
  '<thead>' +
      '<tr>' +
      '<th class="col-xs-2 row-id">Spz</th>' +
      '<th class="col-xs-2">Brand</th>' +
      '<th class="col-xs-2">Type</th>' +
      '<th class="col-xs-1">Seats</th>' +
      '<th class="col-xs-1">Mealige</th>' +
      '<th class="col-xs-2">State</th>' +
      '<th class="col-xs-1"></th>' +
      '<th class="col-xs-1"></th>' +
      '</tr>' +
    '</thead>';

    return html;
}

function GenerateSmallTableBody(tableData){

  var buttonsHtml = GenerateTableButtons();
  var html = '';
  for (index in tableData){

    html +=
      '<tr>' +
        '<td class="row-id">'+tableData[index].Spz+'</td>' +
        '<td>'+tableData[index].Type+'</td>' +
        '<td>'+tableData[index].State+'</td>' +
        buttonsHtml +
      '</tr>';
  }

  return html;
}

function GenerateLargeTableBody(tableData){

  var buttonsHtml = GenerateTableButtons();
  var html = '';
  for (index in tableData){

    html +=
      '<tr>' +
        '<td class="row-id">'+tableData[index].Spz+'</td>' +
        '<td>'+tableData[index].Brand+'</td>' +
        '<td>'+tableData[index].Type+'</td>' +
        '<td>'+tableData[index].Seats+'</td>' +
        '<td>'+tableData[index].Mealige+'</td>' +
        '<td>'+tableData[index].State+'</td>' +
        buttonsHtml +
      '</tr>';
  }

  return html;
}

function GenerateTableButtons(){

  var html =
  '<td>' +
    '<button class="btn-table btn-table-remove route-data" resource-data="data-delete-car" data-toggle="modal" data-target="#confirm-delete" type="button" title="Delete car">' +
      '<span class="glyphicon glyphicon-medium glyphicon-remove"></span>' +
    '</button>' +
  '</td>' +
  '<td class="col-menu">' +
    '<a href="#manage-car-section" class="btn-table btn-table-expand" type="button" title="View car details">' +
      '<span class="glyphicon glyphicon-medium glyphicon-fullscreen"></span>' +
    '</a>' +
  '</td>';

  return html;
}
