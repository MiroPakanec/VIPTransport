function GetClosestRow(cell){
  return $(cell).closest('tr');
}

function GetRowId(cell){
  var rowId = $(cell).closest('td').siblings(".row-id").html();

  if(rowId == null){
    throw("Row id does not exist.");
  }

  return rowId;
}

function GetRowRouteId(cell){
  var rowId = $(cell).closest('td').siblings(".row-route-id").html();

  if(rowId == null){
    throw("Row id does not exist.");
  }

  return rowId;
}
