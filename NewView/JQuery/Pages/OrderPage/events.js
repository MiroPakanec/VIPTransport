$(function(){
  /*LOGIN SUBMIT*/
  $(document).on('click', '.btn-submit', function(){
    var form = GetFormWithButton(this);
    SubmitFormNewOrder(form);
  });
  /*LOGIN BLUR*/
  $(document).on('blur', '.form-control', function(){
    if($(this).hasClass('form-blur-skip')){
      return;
    }
    ValidateElement($(this));
  });
  /*CLEAR BUTTON*/
  $(document).on('click', '.btn-clear', function(){
    var form = GetFormWithButton(this);
    ClearForm(form);
  });

  $(document).on('change', 'select', function(){
    SelectOption($(this));
  });

  /* Generate pasanger name input fields based on selected number of pasangers */
  $(document).on('change', '#numberOfPasangersSelector', function(){
    var errorMessage = "Use first and last name in format <strong>e.g. John Smith</strong>, with min. of 3 characters each, separated with space and first capital letters. Use only characters of <strong>English aplhabet</strong>.";
    var regex = /^[a-zA-Z\s]*$/;
    var type = "input";
    var targetId = 'numberOfPasangersTarget';
    var iterations = $(this).val();

    ClearElementValue('#' + targetId);

    for(i = 0; i<iterations; i++){
      var placeholder = "Psanger name " + (i+1);
      GenerateFormGroup(targetId, type, placeholder, regex, errorMessage);
    }
  });
});
