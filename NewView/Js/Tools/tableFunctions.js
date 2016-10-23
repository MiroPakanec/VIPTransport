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
