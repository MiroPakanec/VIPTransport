function GenerateTable(type){

  console.log(type);
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
  LoadUsers(type);
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
      '<th class="col-xs-4 row-id">Email</th>' +
      '<th class="col-xs-2">Name</th>' +
      '<th class="col-xs-3">Surname</th>' +
      '<th class="col-xs-1"></th>' +
      '</tr>' +
    '</thead>';

    return html;
}

function GenerateLargeTableHead(){
  var html =
  '<thead>' +
      '<tr>' +
        '<th class="col-xs-4 row-id">Email</th>' +
        '<th class="col-xs-2">Name</th>' +
        '<th class="col-xs-2">Surname</th>' +
        '<th class="col-xs-3">Phone</th>' +
        '<th class="col-xs-1"></th>' +
      '</tr>' +
    '</thead>';

    return html;
}

function GenerateLargeTableBody(tableData){

  var buttonsHtml = GenerateTableButtons();
  var html = '';
  for (index in tableData){

    html +=
      '<tr>' +
        '<td class="row-id">'+tableData[index].email+'</td>' +
        '<td>'+tableData[index].fname+'</td>' +
        '<td>'+tableData[index].lname+'</td>' +
        '<td>'+tableData[index].phone+'</td>' +
        buttonsHtml +
      '</tr>';
  }

  return html;
}

function GenerateSmallTableBody(tableData){

  var buttonsHtml = GenerateTableButtons();
  var html = '';
  for (index in tableData){

    html +=
      '<tr>' +
        '<td class="row-id">'+tableData[index].email+'</td>' +
        '<td>'+tableData[index].fname+'</td>' +
        '<td>'+tableData[index].lname+'</td>' +
        buttonsHtml +
      '</tr>';
  }

  return html;
}

function GenerateTableButtons(){

  var html =
  '<td class="col-menu">' +
    '<a href="#manage-user-section" class="btn-table btn-table-edit" type="button">' +
      '<span class="glyphicon glyphicon-medium glyphicon-pencil"></span>' +
    '</a>' +
  '</td>';

  return html;
}
