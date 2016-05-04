$(function (){

  $(document).on('click', '.deleteButton', function(){

    var spz = $(this).parent().attr('id');

    if($('#carCancelButton').is(":visible")){

      $('#carCancelButton').trigger('click');
      setTimeout(function(){

        deleteCar(spz);
      }, 1000);
    }
    else
     deleteCar(spz);
  });

  $(document).on('click','#denyDelete',function(){

    $('#responseArea').html('').slideUp(300);
  });

  $(document).on('click','#confirmDelete',function(){

    spz = $("input[name='deleteRowId']").attr('id');
    deleteCarSpz(function(data){

     handleDeleteResponse(data);
    }, spz);
  });

  $(document).on('click', '.editButton', function(){

    showDetails();
    var spz = $(this).parent().attr('id');
    loadCarDetails(spz);
  });

  $(document).on('click', '#readyButton', function(){

    $('#stateInput').val('ready');
    $('#offhandButton').css({'background-color' : 'rgba(255,255,255,0)'});
    $('#readyButton').css({'background-color' : 'rgba(255,255,255,0.2)'});
  });

  $(document).on('click', '#offhandButton', function(){

    $('#stateInput').val('offhand');
    $('#readyButton').css({'background-color' : 'rgba(255,255,255,0)'});
    $(this).css({'background-color' : 'rgba(255,255,255,0.2)'});
  });

  $(document).on('click', '#newCarButton', function(){

    showDetails();
    generateSubHeader('Stickers', 'stickersArea');
    generateSubHeader('Services', 'servicesArea');
    generateAddRemoveButton('StickerButton', 'stickersArea');
    generateAddRemoveButton('ServiceButton', 'servicesArea');
  });

  $(document).on('click', '#addStickerButton', function(){

    var html = generateEmptySticker();
    $(html).insertBefore($(this).parent());

    $(this).parent().prev().hide();
    $(this).parent().prev().slideDown(500);
  });

  $(document).on('click', '#removeStickerButton', function(){

    var element = $(this).parent().prev();

    if($(element).attr('class') != 'stickerArea')
      return;

    $(element).slideUp(500);
    setTimeout(function(){
        $(element).remove();
    },500);
  });

  $(document).on('click', '#addServiceButton', function(){

    var html = generateEmptyService();
    $(html).insertBefore($(this).parent());

    $(this).parent().prev().hide();
    $(this).parent().prev().slideDown(500);
  });

  $(document).on('click', '#removeServiceButton', function(){

    var element = $(this).parent().prev();

    if($(element).attr('class') != 'serviceArea')
      return;

    $(element).slideUp(500);
    setTimeout(function(){
        $(element).remove();
    },500);
  });

  $(document).on('click', '#carCancelButton', function(){

    hideDetails();
    clearFields();
    hideErrors();
  });

  $(document).on('click', '#carSubmitButton', function(){

    var data = {};

    triggerBlurs();
    if(checkErrors() > 0)
      return;

    data = getCarAttributes(data);
    data = getStickers(data);
    data = getServices(data);

    updateCar(function(response){

      handleUpdateResponse(response);
    }, data);

  });

  //blurs
  $(document).on('blur', '#spzInput', function(){
    validateSpz('#spzInput', '#spzError', /^[A-Z0-9-]*$/, 'Incorrect spz', 8, 8, false);
  });

  $(document).on('blur', '#brandInput', function(){
    validateString('#brandInput', '#brandError', /^[a-z]*$/, 'Incorrect brand', 2, 50, false);
  });

  $(document).on('blur', '#typeInput', function(){
    validateString('#typeInput', '#typeError', /^[a-zA-Z0-9-]*$/, 'Incorrect brand', 2, 50, false);
  });

  $(document).on('blur', '#seatsInput', function(){
    validateNumber('#seatsInput', '#seatsError', /^[0-9]*$/, 'Incorrect number of seats', 2, 30, false);
  });

  $(document).on('blur', '#emissionCheckInput', function(){
    validateDate('#emissionCheckInput', '#emissionCheckError', /^[0-9-]*$/, 'Incorrect date', true);
  });

  $(document).on('blur', '#stkInput', function(){
    validateDate('#stkInput', '#stkError', /^[0-9-]*$/, 'Incorrect date', true);
  });

  $(document).on('blur', '#mandatoryInsuranceInput', function(){
    validateDate('#mandatoryInsuranceInput', '#mandatoruInsuranceError', /^[0-9-]*$/, 'Incorrect date', true);
  });

  $(document).on('blur', '#accidentInsuranceInput', function(){
    validateDate('#accidentInsuranceInput', '#accidentInsuranceError', /^[0-9-]*$/, 'Incorrect date', true);
  });

  $(document).on('blur', '#mealigeInput', function(){
    validateNumber('#mealigeInput', '#mealigeError', /^[0-9.]*$/, 'Incorrect number of seats', 0, 1000000, false);
  });

  $(document).on('blur', '#relativeMealigeInput', function(){
    validateNumber('#relativeMealigeInput', '#relativeMealigeError', /^[0-9.]*$/, 'Incorrect number of seats', 0, 1000000, false);
  });

  $(document).on('blur', '.stickerCountry', function(){

    var input = $(this);
    var error = $(this).next();

    validateGeneratedString(input, error, /^[A-Z]*$/, 2, 0, false);
  });

  $(document).on('blur', '.stickerDate', function(){

    var input = $(this);
    var error = $(this).next();

    validateGeneratedDate(input, error);
  });

  $(document).on('blur', '.serviceIssue', function(){

    var input = $(this);
    var error = $(this).next();

    validateGeneratedString(input, error,  /^[A-Za-z0-9 ]*$/, 50, 0, true);
  });

  $(document).on('blur', '.serviceMealige', function(){

    var input = $(this);
    var error = $(this).next();

    validateGeneratedNumber(input, error,  /^[0-9.]*$/, 1000000, 0, false);
  });

  $(document).on('blur', '.serviceRepareDate', function(){

    var input = $(this);
    var error = $(this).next();

    validateGeneratedDate(input, error);
  });

});

function handleUpdateResponse(response){

  console.log(response);
  if(response == 1){

    $('#carCancelButton').trigger('click');

    setTimeout(function(){

      $('#responseArea').html('Car was successfully updated.').css({
        'background-color' : 'rgba(0,255,0,0.1)',
        'border-color' : 'rgba(0,255,0,0.4)',
        'color' : 'green'
      }).slideDown(500);
      delaySlideUp('#responseArea', 5000);
    }, 1000);
  }
  else if(response == 0){

    /*$('#responseArea').html('Car could not be deleted.').css({
      'background-color' : 'rgba(255,0,0,0.1)',
      'border-color' : 'rgba(255,0,0,0.1)',
      'color' : 'red'
    });
    delaySlideUp('#responseArea', 5000);*/
  }
}

function triggerBlurs(){

  $('.carAttribute').each(function(){
    $(this).trigger('blur');
  });

  $('.generatedCarAttribute').each(function(){
    $(this).trigger('blur');
  })
}

function checkErrors(){

  var errorCounter = 0;

  $('.error').each(function(){

    if($(this).is(":visible"))
      errorCounter++;
  });

  return errorCounter;
}

function hideErrors(){

  $('.error').each(function(){

    $(this).hide();
  });
}

function getCarAttributes(data){

  $('.carAttribute').each(function(){

      var name = $(this).attr('name');
      var value = $(this).val();


      data[name] = value;
  });

  return data;
}

function getStickers(data){

  var stickers = {};
  var index = 0;

  $('.stickerArea').each(function(){

      var sticker = {};

      /*var name = $(this).find(':nth-child(1)').find(':nth-child(1)').html();
      name = name.substring(name.indexOf('>')+1, name.lastIndexOf('<'));
      name = name.replace(/\s+/g, '');*/

      var name = 'sticker'+index;
      var expirationDate = $(this).find(':nth-child(3)').find(':nth-child(2)').val();
      var country = $(this).find(':nth-child(2)').find(':nth-child(2)').val();

      sticker['country'] = country;
      sticker['expirationDate'] = expirationDate;
      stickers[name] = sticker;

      index++;
      //alert(name + ' ' + expirationDate + ' ' + country);
  });

  data['stickers'] = stickers;
  return data;
}

function getServices(data){

  var services = {};
  var index = 0;
  $('.serviceArea').each(function(){

      var service = {};

      /*var name = $(this).find(':nth-child(1)').find(':nth-child(1)').html();
      name = name.substring(name.indexOf('>')+1, name.lastIndexOf('<'));
      name = name.replace(/\s+/g, '');*/

      var name = 'service'+index;
      var issue = $(this).find(':nth-child(2)').find(':nth-child(2)').val();
      var mealige = $(this).find(':nth-child(3)').find(':nth-child(2)').val();
      var repareDate = $(this).find(':nth-child(4)').find(':nth-child(2)').val();

      service['issue'] = issue;
      service['mealige'] = mealige;
      service['repareDate'] = repareDate;
      services[name] = service;

      index++;
      //alert(name + ' ' + issue + ' ' + mealige + ' ' + repareDate);
  });

  data['services'] = services;
  return data;
}

function deleteCar(spz){

  var html = generateDeleteAlert(spz);
  $('#responseArea').html(html).css({
    'background-color' : 'rgba(255,255,255,0.1)',
    'border-color' : 'rgba(255,255,255,0.3)',
    'color' : 'white'
  }).slideDown(500);
}

function handleDeleteResponse(response){

  if(response == 1){

      $('#responseArea').html('Car was successfully deleted.').css({
        'background-color' : 'rgba(0,255,0,0.1)',
        'border-color' : 'rgba(0,255,0,0.4)',
        'color' : 'green'
      });
      delaySlideUp('#responseArea', 5000);
  }
  else if(response == 0){

    $('#responseArea').html('Car could not be deleted.').css({
      'background-color' : 'rgba(255,0,0,0.1)',
      'border-color' : 'rgba(255,0,0,0.1)',
      'color' : 'red'
    });
    delaySlideUp('#responseArea', 5000);
  }
}

function generateDeleteAlert(spz){

  var message = "<p>Are you sure, that you want to delete this car? (spz: "+ spz +")</p>";
  var html = '<br><input type = "button" id="confirmDelete" class ="alertButton" value="YES">' +
              '<input type="button" id="denyDelete" class ="alertButton" value="NO">' +
              '<input type="hidden" id = "'+spz+'" name = "deleteRowId">';
  return message + html;
}

function showDetails(){

  resetHtml();
  $('#responseArea').html('').slideUp(200);
  $('#carTableArea').css({'height' : '4.9%'});
  $('.updateFormContainer').css({'height' : '55%'});
  $('.newCarRow').css({'height' : '0%', 'opacity' : '0'});
  $('#formArea').delay(500).fadeIn(500);
}

function hideDetails(){

  $('#formArea').fadeOut(500);

  setTimeout(function(){

    $('#carTableArea').css({'height' : '40%'});
    $('.updateFormContainer').css({'height' : '0%'});
    $('.newCarRow').css({'height' : '35px', 'opacity' : '1'});
  },400);
}

function clearFields(){

  $('#spzInput').val('');
  $('#brandInput').val('');
  $('#typeInput').val('');
  $('#seatsInput').val('');
  $('#stateInput').val('');
  $('#emissionCheckInput').val('');
  $('#stkInput').val('');
  $('#mandatoryInsuranceInput').val('');
  $('#accidentInsuranceInput').val('');
  $('#mealigeInput').val('');
  $('#relativeMealigeInput').val('');
}

function loadCarDetails(spz){

  getCars(function(data){
    handleCarDetailsResponse(data);
  }, spz);
}

function handleCarDetailsResponse(data){

  var car = data['car1'];

  if(car.Spz.length <= 0)
    return;

  $('#spzInput').val(car.Spz);
  $('#brandInput').val(car.Brand);
  $('#typeInput').val(car.Type);
  $('#seatsInput').val(car.Seats);

  manageState(car.State);

  $('#emissionCheckInput').val(car.EmissionCheck);
  $('#stkInput').val(car.Stk);
  $('#mandatoryInsuranceInput').val(car.MandatoryInsurance);
  $('#accidentInsuranceInput').val(car.AccidentInsurance);
  $('#mealigeInput').val(car.Mealige);
  $('#relativeMealigeInput').val(car.RelativeMealige);

  generateSubHeader('Stickers', 'stickersArea');
  for(index in car.Stickers){

    generateStickerHtml(car.Stickers[index], index);
  }

  generateSubHeader('Services', 'servicesArea');
  for(index in car.Services){

    generateServicesHtml(car.Services[index], index);
  }

  generateAddRemoveButton('StickerButton', 'stickersArea');
  generateAddRemoveButton('ServiceButton', 'servicesArea');
}

function manageState(state){

  $('.stateInput').each(function(){
    $(this).css({'background-color' : 'rgba(255,255,255,0)'});
  });


  if(state == 'ready'){

    $('#stateInput').val('ready');
    $('#readyButton').css({'background-color' : 'rgba(255,255,255,0.2)'});
  }
  else if(state == 'offhand'){

    $('#stateInput').val('offhand');
    $('#offhandButton').css({'background-color' : 'rgba(255,255,255,0.2)'});
  }
}

function resetHtml(){

  $('#stickersArea').html('');
  $('#servicesArea').html('');
}

function generateSubHeader(name, id){

  var html =    '<div class="carRow">'+
                  '<div class="rowTitle smallText subTitle">'+name+'</div>' +
                '</div>';

  $('#' + id).append(html);
}

function generateStickerHtml(sticker, indexName){

  var html =   '<div class="stickerArea">' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText"><strong>'+ indexName +'</strong></div>' +
                '</div>' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText">Country:</div>' +
                  '<input type="text" class="rowTextInput stickerCountry generatedCarAttribute" id="'+ indexName + 'country'+'" name="country" value="'+sticker.Country+'" placeholder="e.g. SK">' +
                  '<div class="error smallText countryError">Error</div>' +
                '</div>' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText">Expiration date:</div>' +
                  '<input type="text" class="rowTextInput stickerDate generatedCarAttribute" id="'+ indexName + 'expirationDate'+'" name="expirationDate" value="'+sticker.ExpirationDate+'" placeholder="e.g. 2015-12-25">' +
                  '<div class="error smallText expirationDateError">Error</div>' +
                '</div>' +
              '</div>';
    $('#stickersArea').append(html);
}

function generateEmptySticker(){

  var html = '<div class="stickerArea">' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText"><strong>New Sticker</strong></div>' +
                '</div>' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText">Country:</div>' +
                  '<input type="text" class="rowTextInput stickerCountry generatedCarAttribute" value="" placeholder="e.g. SK">' +
                  '<div class="error smallText countryError">Error</div>' +
                '</div>' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText">Expiration date:</div>' +
                  '<input type="text" class="rowTextInput stickerDate generatedCarAttribute" value="" placeholder="e.g. 2015-12-25">' +
                  '<div class="error smallText expirationDateError">Error</div>' +
                '</div>' +
              '</div>';

    return html;
}

function generateEmptyService(){

  var html =   '<div class="serviceArea">' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText stickerTitle"><strong>New service</strong></div>' +
                '</div>' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText">Issue:</div>' +
                  '<input type="text" class="rowTextInput serviceIssue generatedCarAttribute" value="" placeholder="e.g. problem with engine">' +
                  '<div class="error smallText" id="spzError">Error</div>' +
                '</div>' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText">Mealige:</div>' +
                  '<input type="text" class="rowTextInput serviceMealige generatedCarAttribute" value="" placeholder="e.g. 50.2">' +
                  '<div class="error smallText" id="spzError">Error</div>' +
                '</div>' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText">Repare date:</div>' +
                  '<input type="text" class="rowTextInput serviceRepareDate generatedCarAttribute" value="" placeholder="e.g. 2015-12-25">' +
                  '<div class="error smallText" id="spzError">Error</div>' +
                '</div>' +
              '</div>';

    return html;
}

function generateServicesHtml(service, indexName){

  var html =   '<div class="serviceArea">' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText stickerTitle"><strong>'+ indexName +'</strong></div>' +
                '</div>' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText">Issue:</div>' +
                  '<input type="text" class="rowTextInput serviceIssue generatedCarAttribute" id="'+ indexName + 'issue'+'" name="'+ indexName + 'issue'+'" value="'+service.Issue+'" placeholder="e.g. problem with engine">' +
                  '<div class="error smallText" id="spzError">Error</div>' +
                '</div>' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText">Mealige:</div>' +
                  '<input type="text" class="rowTextInput serviceMealige generatedCarAttribute" id="'+ indexName + 'mealige'+'" name="'+ indexName + 'mealige'+'" value="'+service.Mealige+'" value="" placeholder="e.g. 50.2">' +
                  '<div class="error smallText" id="spzError">Error</div>' +
                '</div>' +
                '<div class="carRow">' +
                  '<div class="rowTitle smallText">Repare date:</div>' +
                  '<input type="text" class="rowTextInput serviceRepareDate generatedCarAttribute" id="'+ indexName + 'repareDate'+'" name="'+ indexName + 'repareDate'+'" value="'+service.RepareDate+'" placeholder="e.g. 2015-12-25">' +
                  '<div class="error smallText" id="spzError">Error</div>' +
                '</div>' +
              '</div>';
    $('#servicesArea').append(html);
}

function generateAddRemoveButton(name, id){

  var html =   '<div class="carRow">' +
                '<input type="button" class="carActionButton carButton" id="'+ 'add' + name + '" value="+">' +
                '<input type="button" class="carActionButton carButton" id="'+ 'remove' + name+'" value="-">' +
               '</div>';

  $('#' + id).append(html);
}
