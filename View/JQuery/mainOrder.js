//dynamic functionality order
$(function(){

    var timeButton = 'AM';

    $('#orderDateButton').on('click', function(){
      $('#datepickerMain').slideToggle(500);
    }),

    $("#datepickerMain").datepicker({
            inline: true,
            showOtherMonths: true,
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dateFormat: "dd/mm/yy",
            minDate: '+1D',
            maxDate: '+6M',
            onSelect: function (date) {
                    $('#orderDate').html(date);
                  }
    }),

    //time check

    $("input[id*='orderTime']").focus(function(){
      var curVal = $(this).val();
      if(curVal == 'Hour' || curVal == 'Minute')
        $(this).val('');
    }).blur(function(){
      var input = $(this).val();
      if(!input.length > 0){
        setDefaultText(this);
        setTextColor(this, 'red');
      }
      else{
       //validate if input is correct number
       validateNumber(this, input);
     }
    }),

    //plus minut buttons
    $("#plusButton").on('click', function(){
      var value = $('#orderPasangers').html();
        if(value < 9)
          $('#orderPasangers').html(parseInt(value) + 1);
    }),

    $("#minusButton").on('click', function(){
      var value = $('#orderPasangers').html();
        if(value > 1)
          $('#orderPasangers').html(parseInt(value) - 1);
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
    $('#timeButtonAM').on('click', function(){
      timeButton = 'AM';
      $(this).css({
        'background-color' : 'rgba(255, 255, 255, 0.1)'
      });
      $('#timeButtonPM').css({
        'background-color' : 'rgba(255, 255, 255, 0.0)'
      });
    }),

    $('#timeButtonPM').on('click', function(){
      timeButton = 'PM';
      $(this).css({
        'background-color' : 'rgba(255, 255, 255, 0.1)'
      });
      $('#timeButtonAM').css({
        'background-color' : 'rgba(255, 255, 255, 0.0)'
      });
    }),

    $('#orderClearButton').on('click', function(){
      $('#orderUsername').val('').css({'color' : 'black'});
      $('#orderCompanyName').val('').css({'color' : 'black'});
      $('#paymentTypeButton').html('Select payment');
      $('#orderDate').html('Select date');
      $('#datepickerMain').slideUp(500);
      $('#orderTimeHour').val('Hour').css({'color' : 'black'});
      $('#orderTimeMinute').val('Minute').css({'color' : 'black'});
      $('#timeButtonAM').css({
        'background-color' : 'rgba(255, 255, 255, 0.1)'
      });
      $('#timeButtonPM').css({
        'background-color' : 'rgba(255, 255, 255, 0)'
      });
      timeButton = 'AM';
      $('#ordeFrom').val('').css({'color' : 'black'});
      $('#orderTo').val('').css({'color' : 'black'});
      $('#orderPasangers').html('2');
    })
  });
