function ValidateForm(form){
  $(form).find('.form-control').each(function(){
    ValidateElement(this);
  });
}

function IsFormCorrect(form){
  var ec = 0;
  $(form).find('.form-group').each(function(){
    if($(this).hasClass('has-error')){
      ec++;
    }
  });
  console.log("ERROR COUNT " + ec);

  if(ec == 0){
    return true;
  }

  return false;
}

  function ValidateElement(element){
  //Remove spacing
  element = RemoveSpaces(element);

  //check if regular expretion exists
  var regex = GetRegex(element);
  if(regex == null){
    console.log("Regular expretion of form element with ID:\n" + GetElementId(element) + "\nwas not specified.");
    Fail(element);
    return 0;
  }

  //check if value exists
  var value = GetElementValue(element);
  if(value == null || (IsMandatory(element) && IsEmpty(element))){
    console.log("Value of form element with ID:\n" + GetElementId(element) + "\nwas not specified.");
    Fail(element);
    return;
  }

  //check if value is not default
  if(HasDefault(element)){
    var defaultValue = GetElementDefaultValue(element);
    if(value == defaultValue){
      Fail(element);
      return;
    }
  }

  //check if element has to match with other element (data-match)
  if(HasDataMatch(element)){
    var referenceElementID = $(element).attr('data-match');
    var value1 = GetElementValue(element);
    var value2 = GetElementValue(referenceElementID);

    if(value1 !== value2){
      Fail(element);
      return;
    }
  }

  //check if element has to be checked with another element (data-member)
  if(HasDataMember(element)){
    ValidateDataMember(element);
  }

  //check if is not mandatory and empty
  if(!IsMandatory(element) && IsEmpty(element)){
    Success(element);
    return;
  }

  //check if value is correct
  if(!regex.test(value)){
    Fail(element);
    return;
  }

  Success(element);
}

function Fail(element){
  ShowRedOutline(element);
  ShowErrors(element);
}

function Success(element){
  ShowGreenOutline(element);
  HideErrors(element);
}

function GetRegex(element){

  var regexString = $(element).siblings('.regex').attr('regex');
  var regex = RegexFromString(regexString);

  return regex;
}

function ShowRedOutline(element){
  $(element).parents('.form-group').removeClass('has-warning');
  $(element).parents('.form-group').removeClass('has-success');
  $(element).parents('.form-group').addClass('has-error');
}

function ShowGreenOutline(element){
  $(element).parents('.form-group').removeClass('has-warning');
  $(element).parents('.form-group').removeClass('has-error');
  $(element).parents('.form-group').addClass('has-success');
}

function ShowYellowOutline(element){
  $(element).parents('.form-group').removeClass('has-error');
  $(element).parents('.form-group').removeClass('has-success');
  $(element).parents('.form-group').addClass('has-warning');
}

function HideOutline(element){
  $(element).parents('.form-group').removeClass('has-error');
  $(element).parents('.form-group').removeClass('has-warning');
  $(element).parents('.form-group').removeClass('has-success');
}

function ShowErrors(element){

  var errorArray = $(element).siblings('.error-message');
  var index;
  for (index = 0; index < errorArray.length; ++index) {
    $(errorArray[index]).removeClass('invisible');
    $(errorArray[index]).addClass('visible');
  }
}

function HideErrors(element){

  var errorArray = $(element).siblings('.error-message');
  var index;
  for (index = 0; index < errorArray.length; ++index) {
    $(errorArray[index]).removeClass('visible');
    $(errorArray[index]).addClass('invisible');
  }
}

function RegexFromString(inputstring){
  var flags = inputstring.replace(/.*\/([gimy]*)$/, '$1');
  var pattern = inputstring.replace(new RegExp('^/(.*?)/'+flags+'$'), '$1');
  var regex = new RegExp(pattern, flags);

  return regex;
}

function IsMandatory(element){
  if($(element).hasClass('form-mandatory')){
    return true;
  }
  else{
    return false;
  }
}

function HasDefault(element){
  if(HasAttr(element, 'default')){
    return true;
  }
  else{
    return false;
  }
}

function HasDataMatch(element){
  if(HasAttr(element, 'data-match')){
    return true;
  }
  else{
    return false;
  }
}

function HasDataMember(element){
  if(HasAttr(element, 'data-member')){
    return true;
  }
  else{
    return false;
  }
}

function ValidateDataMember(element){
  var dataMembers = $(element).attr('data-member').split();
  var index;
  for (index = 0; index < dataMembers.length; ++index) {
    var dataMember = dataMembers[index];
    if(IsEmpty(dataMember)){
      break;
    }
    ValidateElement(dataMembers[index]);
  }
}
