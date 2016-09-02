//dynamic functionality order
$(function(){

    $('#notifications').on('click', function(){
      window.location="notificationsPage.html";
    }),

    $('#orderEmail').on('blur', function(){

      if($('#userType').val() != 'manager')
        return;


      getCompanyData($(this).val());
    })

    $('#orderDate').on('click', function(){
      $('#datepickerMain').slideToggle(500);
    }),

    $("#datepickerMain").datepicker({
            inline: true,
            showOtherMonths: true,
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dateFormat: "dd/mm/yy",
            minDate: '+0D',
            maxDate: '+6M',
            onSelect: function (date) {
                    $('#orderDate').html(date);
                    $('#datepickerMain').slideToggle(500);
                }
    }),


    //plus minut buttons
    $("#plusButton").on('click', function(){
      var value = $('#orderPasangers').html();
        if(value < 9){
          $('#orderPasangers').html(parseInt(value) + 1);
          //generatePasangers($('#orderPasangers').html());
          addPasangers();
          validateGenerated();
        }
    }),

    $("#minusButton").on('click', function(){
      var value = $('#orderPasangers').html();
        if(value > 1){
          $('#orderPasangers').html(parseInt(value) - 1);
          //generatePasangers($('#orderPasangers').html());
          removePasanger();
          validateGenerated();
        }
    }),

    $("#paymnetTypeButton").on('click', function(){
      $(this).appendTo('<input type="button" class="button" value="test"></input>');
    }),

    $("#paymentTypeButton, .paymentSelection").mouseover(function(){
      $('.paymentSelection').stop().slideDown(500);
    }),

    $("#paymentTypeButton, .paymentSelection").mouseout(function(){
      $('.paymentSelection').stop().slideUp(300);
    }),

    $(".paymentSelection").click(function(){
      var value = $(this).html();
      $('#paymentTypeButton').html(value);
    })

    //time AM/ PM

    $('#timeButtonAM').css({
      'background-color' : 'rgba(255, 255, 255, 0.3)'
    });

    $('#timeButtonAM').on('click', function(){
      $('#orderClock').val('AM');
      $(this).css({
        'background-color' : 'rgba(255, 255, 255, 0.3)'
      });
      $('#timeButtonPM').css({
        'background-color' : 'rgba(255, 255, 255, 0.0)'
      });
    }),

    $('#timeButtonPM').on('click', function(){
      $('#orderClock').val('PM');
      $(this).css({
        'background-color' : 'rgba(255, 255, 255, 0.3)'
      });
      $('#timeButtonAM').css({
        'background-color' : 'rgba(255, 255, 255, 0.0)'
      });
    });

    $(document).on('click', '#orderBackButton', function(){

      window.location="myTransportsPage.html";
    });
  });

  function generatePasangers(num){

    var html = '';

    for(var i = 0; i< num; i++){

      html += generateHtml(i);
    }

    $('#pasangerNames').html(html);
    $('.errorMessageGenerated').hide();
  }

  function addPasangers(){

    var html = '';
    var counter = -1;
    $('.generatedInputField').each(function(){
      counter++;
    })

    html = generateHtml(counter + 1);
    $(html).insertAfter($('#orderPasangerName'+ counter).parent());
    $('#errorOrderPasangerName' + (counter+1)).hide();
  }

  function removePasanger(){

    var counter = -1;
    $('.generatedInputField').each(function(){
      counter++;
    })

    $('#orderPasangerName' + counter).parent().remove();
  }

  function generateHtml(counter){

    var html = '';
    html += '<div class="mainRow" style="margin-bottom: 1%">' +
            '<div class="mainText col-sm-12 col-md-5 col-lg-5">Full name ' + (counter+1) + ': *</div>'+
            '<input type="text" name="pasangerName'+counter+'" class="mainTextInput generatedInputField col-sm-12 col-md-4 col-lg-4" id="orderPasangerName'+counter+'" maxlength="30">'+
            '<div id="errorOrderPasangerName'+counter+'" class="errorMessage errorMessageGenerated col-sm-12 col-md-3 col-lg-3"></div>' +
            '</div>'
    return html;
  }
