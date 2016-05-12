function validateSpz(id, idErr, regex, customeMessage, min, max, skip){

    var value = $(id).val().trim();
    $(id).val(value);

    if(!value && !skip)
      $(idErr).html('Cannot be empty').slideDown(500);
    else if(!regex.test(value))
      $(idErr).html(customeMessage).slideDown(500);
    else if(value.length < min && !skip)
      $(idErr).html('Minimum ' + min + ' characters').slideDown(500);
    else if(value.length > max)
      $(idErr).html('Maximum ' + max + ' characters').slideDown(500);
    else if(value[2] != '-')
      $(idErr).html(customeMessage).slideDown(500);
    else
      $(idErr).html('').slideUp(500);

}

function validateString(id, idErr, regex, customeMessage, min, max, skip){

  var value = $(id).val().trim();
  $(id).val(value);

  if(!value && !skip)
    $(idErr).html('Cannot be empty').slideDown(500);
  else if(!regex.test(value))
    $(idErr).html('Incorrect format').slideDown(500);
  else if(value.length < min && !skip)
    $(idErr).html('Minimum ' + min + ' characters').slideDown(500);
  else if(value.length > max)
    $(idErr).html('Maximum ' + max + ' characters').slideDown(500);
  else
    $(idErr).html('').slideUp(500);
}

function validateNumber(id, idErr, regex, customeMessage, min, max, skip){

  var value = $(id).val().trim();
  $(id).val(value);

  if(!value && !skip)
    $(idErr).html('Cannot be empty').slideDown(500);
  else if(!regex.test(value))
    $(idErr).html('Incorrect format').slideDown(500);
  else if(value < min && !skip)
    $(idErr).html('Minimum is ' + min).slideDown(500);
  else if(value > max)
    $(idErr).html('Maximum is ' + max).slideDown(500);
  else
    $(idErr).html('').slideUp(500);
}

function validateDate(id, idErr, regex, customeMessage, skip){

  var value = $(id).val().trim();
  var date = new Date(value);
  $(id).val(value);

  if(!value && !skip)
    $(idErr).html('Cannot be empty').slideDown(500);
  else if(!regex.test(value))
    $(idErr).html('Incorrect format').slideDown(500);
  else if(date == 'Invalid Date' && !skip)
    $(idErr).html(customeMessage).slideDown(500);
  else
    $(idErr).html('').slideUp(500);
}

function validateDateHtml(id, idErr, regex, customeMessage, skip){

  var value = $(id).html().trim();
  var date = new Date(value);
  $(id).val(value);

  if(!value && !skip)
    $(idErr).html('Cannot be empty').slideDown(500);
  else if(!regex.test(value))
    $(idErr).html('Incorrect format').slideDown(500);
  else if(date == 'Invalid Date' && !skip)
    $(idErr).html(customeMessage).slideDown(500);
  else
    $(idErr).html('').slideUp(500);
}

function validateGeneratedString(input, error, regex, max, min, skip){

  var value = $(input).val();

  if(!value && !skip)
    $(error).html('Cannot be empty').slideDown(500);
  else if(!regex.test(value))
    $(error).html('Incorrect format').slideDown(500);
  else if(value.length > max)
    $(error).html('Maximum '+max+' characters').slideDown(500);
  else if(value.length < min  && !skip)
    $(error).html('Minimum '+min+' characters').slideDown(500);
  else
    $(error).html('').slideUp(500);
}

function validateGeneratedDate(id, idErr){

  var value = $(id).val().trim();
  var date = new Date(value);
  var regex = /^[0-9-]*$/;

  $(id).val(value);

  if(!value)
    $(idErr).html('Cannot be empty').slideDown(500);
  else if(!regex.test(value))
    $(idErr).html('Incorrect format').slideDown(500);
  else if(date == 'Invalid Date')
    $(idErr).html('Invalid Date').slideDown(500);
  else
    $(idErr).html('').slideUp(500);
}

function validateGeneratedNumber(input, error, regex, maxVal, minVal, skip){

  var value = $(input).val();

  if(!value && !skip)
    $(error).html('Cannot be empty').slideDown(500);
  else if(!regex.test(value))
    $(error).html('Incorrect format').slideDown(500);
  else if(value > maxVal)
    $(error).html('Maximum value is milion').slideDown(500);
  else if(value < minVal  && !skip)
    $(error).html('Negative numbers are not allowed').slideDown(500);
  else if(isNaN(value))
    $(error).html('Not a number').slideDown(500);
  else
    $(error).html('').slideUp(500);
}
