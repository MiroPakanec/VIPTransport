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
