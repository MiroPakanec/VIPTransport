$(window).resize(function(){
  /*RESIZE HAS TO BE TURNED OFF DUE TO HTML DEPENDENCIES*/
  //GenerateTable();
});

/*DELETE RECORD*/
$(document).on('show.bs.modal', '#confirm-delete', function(e) {

    var id = GetRowId($(e.relatedTarget));
    var url =  $(e.relatedTarget).data('href') + "?id=" + id;

    $(this).find('.btn-ok').attr('href', url);
});

/*CONFIRM DELETE*/
$(document).on('click', '.btn-ok', function(){

  var url = $(this).attr('href');
  var data = URLToArray(url);

  ajaxCall(DeleteResponse, "POST", url, null, data);
});

/*EXPAND RECORD*/
$(document).on('click', '.btn-table-expand', function(){

  var url = $(this).attr('href');
  var id = GetRowId($(this))
  window.location.replace(url + "?id=" + id);
});

/*CONFIRM*/
$(document).on('click', '.btn-table-confirm', function(){

  var url = $(this).attr('href');
  var id = GetRowId($(this))
  window.location.replace(url + "?id=" + id);
});
