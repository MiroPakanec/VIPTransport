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

function registerUserRequest(handleData, data){

  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/register.php',
      data: data,
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
        console.log(response);
          handleData(response);
      },
      error: function(response){
        console.log(response);
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

function getStatistics(handleData, data){

  $.ajax({
      type: 'GET',
      url: '../../Server/Responses/getStatistics.php',
      data: data,
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

function getCars(handleData, spz){

  data = {};
  data['spz'] = spz;


  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/getCars.php',
      dataType : 'json',
      data: data,
      success: function(response){

          handleData(response);
      },
      error:function(response){
      }
  });
}

function updateCar(handleData, data){


  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/updateCar.php',
      data: data,
      success: function(response){
          handleData(response);
      },
      error:function(response){
      }
  });
}

function deleteCarSpz(handleData, spz){

  data = {};
  data['spz'] = spz;

  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/deleteCar.php',
      data: data,
      success: function(response){
          handleData(response);
      },
      error:function(response){
      }
  });
}

function checkStickers(handleData, spz, routeId){

  data = {};
  data['spz'] = spz;
  data['routeId'] = routeId;

  $.ajax({
      type: 'GET',
      url: '../../Server/Responses/checkStickers.php',
      data: data,
      success: function(response){
          handleData(response);
      },
      error:function(response){
      }
  });
}

function getRoutes(handleData, id, email, orderId){

  data = {};
  data['id'] = id;
  data['email'] = email;
  data['orderId'] = orderId;
  console.log(data);

  $.ajax({
      type: 'GET',
      url: '../../Server/Responses/getRoutes.php',
      dataType : 'json',
      data: data,
      success: function(response){

          handleData(response);
          console.log(response);
      },
      error:function(response){
        console.log(response);
      }
  });
}

function getFinishedTransports(handleData){

  $.ajax({
      type: 'GET',
      url: '../../Server/Responses/getFinishedTransports.php',
      dataType : 'json',
      data: '',
      success: function(response){
          handleData(response);
      },
      error:function(response){
        console.log(response);
      }
  });
}

function getTransports(handleData, id, dateFrom, dateTo, email){

  data = {};
  data['id'] = id;
  data['email'] = email;
  data['dateFrom'] = dateFrom;
  data['dateTo'] = dateTo;

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

function getEmployeess(handleData, email, fname, lname, type){

  data = {};
  data['email'] = email;
  data['fname'] = fname;
  data['lname'] = lname;
  data['type'] = type;

  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/getEmployees.php',
      dataType : 'json',
      data: data,
      success: function(response){
          handleData(response);
      },
      error:function(response){
      }
  });
}

function updateUserType(handleData, email, type){

  data = {};
  data['email'] = email;
  data['type'] = type;

  $.ajax({
      type: 'POST',
      url: '../../Server/Responses/updateUserType.php',
      data: data,
      success: function(response){
          handleData(response);
      },
      error:function(response){
      }
  });
}

function deleteOrder(handleData, id){

  console.log(id);

  $.ajax({
    url: '../../Server/Responses/deleteOrder.php',
    type: 'POST',
    data: 'id='+id,
    success: function(response){
      console.log(response);
      handleData(response);
    },
    error: function(response){
      console.log(response);
    }
  })
}

function submitTransport(handleData, data){

  $.ajax({
    url: '../../Server/Responses/submitTransport.php',
    type: 'POST',
    data: data,
    success: function(response){
      console.log(response);
      handleData(response);
    },
    error: function(response){
      console.log(response);
    }
  })
}

function submitOrderRequest(handleData, data){

  console.log(data);

  $.ajax({
    url: '../../Server/Responses/submitOrder.php',
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(response){
      console.log(response);
      handleData(response);
    },
    error: function(response){
      console.log(response);
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

function getCountriesEurope(handleData){

  $.ajax({
      type: 'GET',
      url: 'https://restcountries.eu/rest/v1/region/europe',
      data: '',

      success: function(response){
          handleData(response);
      },
      error: function(response){
        //console.log('RESPONSE ERRROR' + response);
      }
  });
}
