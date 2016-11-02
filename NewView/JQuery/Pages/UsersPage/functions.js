function GetSearchData(){

  var type = GetType();
  var input = GetSearchInput();

  var data = {type: type, email:'', fname:'', lname:input};
  return data;
}

function GetSearchInput(){

  var input = $('.search-input').val();
  return input;
}

function GetType(){

  var type;
  $('.btn-radio').each(function(){

    if($(this).hasClass('active')){
      type = $(this).html().toLowerCase();
    }
  });

  if(type == null){
    throw "No active button type exists.";
  }
  if(type == 'employee'){
    return "transporter";
  }
  return type;
}

function FillFormWithUser(response){

  $('#email').val(response.email);
  $('#fname').val(response.fname);
  $('#mname').val(response.mname);
  $('#lname').val(response.lname);
  $('#phone').val(response.phone);


  if(response.type == 'transporter'){
    $('#type').val('employee');
  }
  else{
    $('#type').val(response.type);
  }
}

function ManageUserData(data){

  if(data.type == 'employee'){
    data.type  = 'transporter';
  }

  return data;
}
