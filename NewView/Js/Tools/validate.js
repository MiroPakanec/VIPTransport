function ValidateForm(form){
  $(form).find('.form-control').each(function(){
    ValidateElement(this);
  });
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
  $(element).parents('.form-group').removeClass('has-success');
  $(element).parents('.form-group').addClass('has-error');

  ShowErrors(element);
}

function Success(element){
  $(element).parents('.form-group').removeClass('has-error');
  $(element).parents('.form-group').addClass('has-success');

  HideErrors(element);
}

function GetRegex(element){
  var regexString = $(element).next().val();
  var regex = RegexFromString(regexString);

  return regex;
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
