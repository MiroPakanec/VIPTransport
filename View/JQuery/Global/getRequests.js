function getSession(handleData){

  $.ajax({
      type: 'GET',
      url: '../../Server/Responses/getSession.php',
      dataType : 'json',
      data: '',
      success: function(response){
          handleData(response);
      }
  });
}

function getTransports(handleData, id){


  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/getTransports.php',
      dataType : 'json',
      data: {'id' : id},
      success: function(response){
          handleData(response);
      }
  });
}

function getOrderNames(handleNamesData, id){

    $.ajax({
        type: 'POST',
        url: '../../Server/Responses/getNames.php',
        dataType : 'json',
        data: {'id' : id},
        //data: "id="+id,
        success: function(response){
            handleNamesData(response);
        }
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url.toLowerCase(); // This is just to avoid case sensitiveness
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
