$(document).on('click', '.btn-table-expand', function(){

  var url = $(this).attr('href');
  var id = GetRowId($(this))
  window.location.replace(url + "?id=" + id);
});
