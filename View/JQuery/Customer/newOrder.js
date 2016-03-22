//dynamic functionality order
$(function(){

    $('#orderDate').on('click', function(){
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
                    $('#datepickerMain').slideToggle(500);
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

    $('#timeButtonAM').css({
      'background-color' : 'rgba(255, 255, 255, 0.1)'
    });

    $('#timeButtonAM').on('click', function(){
      $('#orderClock').val('AM');
      $(this).css({
        'background-color' : 'rgba(255, 255, 255, 0.1)'
      });
      $('#timeButtonPM').css({
        'background-color' : 'rgba(255, 255, 255, 0.0)'
      });
    }),

    $('#timeButtonPM').on('click', function(){
      $('#orderClock').val('PM');
      $(this).css({
        'background-color' : 'rgba(255, 255, 255, 0.1)'
      });
      $('#timeButtonAM').css({
        'background-color' : 'rgba(255, 255, 255, 0.0)'
      });
    })
  });
