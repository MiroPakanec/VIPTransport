$(function(){

  /*FIX on Generated elements*/
  $(document).on('click', '.form_date', function(){

    $('.form_date').datetimepicker({
      //language:  'fr',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        startDate: MinTime()
    });
  });

});

$('.form_datetime').datetimepicker({
    //language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    showMeridian: 1
});

$('.form_date').datetimepicker({
  //language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0,
    startDate: MinTime()
});

$('.form_time').datetimepicker({
  //language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 1,
    minView: 0,
    maxView: 1,
    forceParse: 0,
    startHoue: MinTime()
});

function MinDate(){

  return new Date();
}

function MinTime(){

  return Date.now();
}
