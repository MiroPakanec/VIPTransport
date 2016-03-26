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

function getTransports(handleData){

  $.ajax({
      type: 'GET',
      url: '../../Server/Responses/getTransports.php',
      dataType : 'json',
      data: '',
      success: function(response){
          handleData(response);
      }
  });
}
