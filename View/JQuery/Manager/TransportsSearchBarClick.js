$(function(){

  $('#idInput').on('keyup', function(){
    var value = manageIdInput($(this).val());
    $(this).val(value);
    search();
  });

  $('#dateFromInput').on('click', function(){
    manageDateInput('from', '-1.7%');
  });

  $('#dateToInput').on('click', function(){
    manageDateInput('to', '21.3%');
  });

  $('#emailInput').on('keyup', function(){
    var value = manageEmailInput($(this).val());
    $(this).val(value);
    search();
  });

  $('#clearButton').on('click', function(){
    clearFields();
    search(); //search all
  });

  $('#searchButton').on('click', function(){
    search();
  });

});

function manageIdInput(value){

  var regex = /^[0-9]*$/;
  var color = 'rgba(255,0,0,0.1)';

  if(!regex.test(value))
    color = 'rgba(255,0,0,0.1)';
  else
    color = 'rgba(255,255,255,0.2)';

  $('#idInput').css({'background-color' : color});
  return value;
}

function manageDateInput(value, margin){

  $('#dateType').val(value);

  if($('#dateState').val() == 0){

    manageTableHeight();
    $('#dateState').val('1');
    $('.datePickerArea').css({'margin-left' : margin}).slideDown(500);
  }
  else{

    manageTableHeight();
    $('#dateState').val('0');
    $('.datePickerArea').slideUp(500);
  }
}

function manageTableHeight(){

  var height = $('.orderTableArea').css('height').slice(0, -2);
  if(height > 200)
    $('.orderTableArea').css({'height' : '190px'});
  else
    setTimeout(function(){
        $('.orderTableArea').css({'height' : '350px'});
    },100);
}

function manageSearchDate(date){

  var type = $('#dateType').val();

  if(type == 'from'){

    $('#dateFromInput').html(date);
    search();
  }
  else if(type == 'to'){
    $('#dateToInput').html(date);
    search();
  }

  $('.datePickerArea').slideToggle(500);
  $('#dateState').val('0');
  manageTableHeight();
}

function manageEmailInput(value){

  var emailRegex = /^[a-zA-Z0-9-_.@]*$/;
  var color = 'rgba(255,0,0,0.1)';

  if(!emailRegex.test(value))
    color = 'rgba(255,0,0,0.1)';
  else
    color = 'rgba(255,255,255,0.2)';

  $('#emailInput').css({'background-color' : color});
  return value;
}

function clearFields(){

  $('#idInput').val('').css({'background-color' : 'rgba(255,255,255,0.2)'});
  $('#dateFromInput').html('Date from').css({'background-color' : 'rgba(255,255,255,0.2)'});
  $('#dateToInput').html('Date to').css({'background-color' : 'rgba(255,255,255,0.2)'});
  $('#emailInput').val('').css({'background-color' : 'rgba(255,255,255,0.2)'});
}

function search(){

  var id = date1 = date2 = email = '';

  if(validateId() == 1)
    id = $('#idInput').val();

  if(validateDate('#dateFromInput', 'from') == 1)
    date1 = manageDateFormat($('#dateFromInput').html());

  if(validateDate('#dateToInput', 'to') == 1)
    date2 = manageDateFormat($('#dateToInput').html());

  if(validateEmail() == 1)
    email = $('#emailInput').val();

  setSearchFields(id, date1, date2, email);
  sendOrderSearchRequest();
}

function setSearchFields(id, date1, date2, email){

  $('#idRequest').val(id);
  $('#dateFromRequest').val(date1);
  $('#dateToRequest').val(date2);
  $('#emailRequest').val(email);
}

function sendOrderSearchRequest(){

  $("#titleOrder").trigger('click');
}

function validateId(){

  var id = $('#idInput').val();
  var regex = /^[0-9]*$/;

  if(id.length == 0)
    return 0;
  else if(!regex.test(id))
    return 0;

  return 1;
}

function validateDate(id, type){

  var dateString = manageDateFormat($(id).html());
  var date = new Date(dateString);

  //date was not selected
  if(date == 'Invalid Date')
    return 0;

  if(type == 'to'){

    dateFrom = new Date(manageDateFormat($('#dateFromInput').html()));
    return compareDates(dateFrom, date);
  }

  return 1;
}

function validateEmail(){

  var email = $('#emailInput').val();
  var emailRegex = /^[a-zA-Z0-9-_.@]*$/;

  if(email.length == 0)
    return 0;
  else if(!emailRegex.test(email))
    return 0;

  return 1;
}

function compareDates(date1, date2){

  if(date1 >= date2){

    $('#dateToInput').html('Must be after Date From').css({'background-color' : 'rgba(255,0,0,0.1)'});
    return 0;
  }

  $('#dateToInput').css({'background-color' : 'rgba(255,255,255,0.2)'});
  return 1;
}

function manageDateFormat(dateString){

  var year = dateString.substring((dateString.length - 4), dateString.length);
  var month = dateString.substring(3,5);
  var day = dateString.substring(0,2);

  return year + '-' + month + '-' + day;
}
