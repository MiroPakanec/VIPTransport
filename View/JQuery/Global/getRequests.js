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

function endSession(handleData){

  $.ajax({
      type: 'GET',
      url: '../../Server/Responses/endSession.php',
      data: '',
      success: function(response){
          handleData(response);
      },
      error: function(response){
          handleData(response);
      }
  });
}

function getUserData(handleData, email){

  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/getUser.php',
      dataType : 'json',
      data: {'email' : email},
      success: function(response){
        handleData(response);
      },
      error: function(response){
          handleData(response);
      }
  });
}


function getNotificationsAmmount(handleData){

  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/getNotificationsAmmount.php',
      //dataType : 'json',
      data: {'ammount':'n'},
      success: function(response){
          handleData(response);
      },
      error: function(response){
      }
  });
}


function getNotifications(handleData, ammount, skip, type){

  //skip = 0;

  var data = {};
  data['ammount'] = ammount;
  data['skip'] = skip;
  data['type'] = type;

  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/getNotifications.php',
      dataType : 'json',
      data: data,
      success: function(response){
          handleData(response);
      },
      error: function(response){
      }
  });
}

function readNotifications(handleData, data){

  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/readNotifications.php',
      data: data,
      success: function(response){
          handleData(response);
      },
      error: function(response){
          alert(response);
      }
  });
}

function readAllNotifications(handleData){

  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/readAllNotifications.php',
      data: '',
      success: function(response){
          handleData(response);
      },
      error: function(response){
          alert(response);
      }
  });
}

function getCompany(handleData, email){

  var data = {};
  data['email'] = email;

  $.ajax({
      type: 'GET',
      url: '../../Server/Responses/getCompany.php',
      dataType : 'json',
      data: data,
      success: function(response){
        handleData(response);
      },
      error: function(response){
      }
  });
}

function getTransports(handleData, id, dateFrom, dateTo, email){

  data = {};
  data['id'] = id;
  data['email'] = email;
  data['dateFrom'] = dateFrom;
  data['dateTo'] = dateTo;

  console.log(data);

  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/getTransports.php',
      dataType : 'json',
      data: data,
      success: function(response){
          console.log(response);
          handleData(response);
      },
      error:function(response){
        console.log(response);

      }
  });
}

function deleteOrder(handleData, id){

  $.ajax({
    url: '../../Server/Responses/deleteOrder.php',
    type: 'POST',
    data: 'id='+id,
    success: function(response){
      console.log(response);
      handleData(response);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
      alert('Something went wrong...');
    }
  })
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
