$(function(){

  //main area button css
  $('.mainStatisticsSelection').on('click', function(){

    element = $(this);
    $('.subSelectionArea').html('');
    $('.subSelectionInputArea').html('').hide();
    mainStatisticsSelectionClick(element);
  });

  //sub area button css
  $(document).on('click', '.subStatisticsSelection', function(){

    var element = $(this);
    //button colors
    subStatisticsSelectionClick(element);
    loadStatistics(element);

  });

  //main selection area buttons
  $('#mainIncome').on('click', function(){

    generateIncomeSubSelectionArea();
    $('#incomeCar').trigger('click');
  });

  //date selections
  $('#dateFromButton').on('click', function(){
    $("#datePickerAreaFrom").slideToggle(300);
  });

  $('#dateToButton').on('click', function(){
    $("#datePickerAreaTo").slideToggle(300);
  });
});

function mainStatisticsSelectionClick(element){

  var value = $(element).val();

  $('.mainStatisticsSelection').each(function(){
    $(this).removeClass('mainStatisticsSelectionSelected');
  });

  $('#mainSelected').val(value);
  $(element).addClass('mainStatisticsSelectionSelected');
}

function subStatisticsSelectionClick(element){

  $('.subStatisticsSelection').each(function(){
    $(this).removeClass('subStatisticsSelectionSelected');
  });

  $(element).addClass('subStatisticsSelectionSelected');
}

function generateIncomeSubSelectionArea(){

  $('.subSelectionArea').html('').hide();
  var html = '<input type="button" id="incomeCar" class="subStatisticsSelection subStatisticsSelectionSelected statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2" value="per Car">'
            +'<input type="button" id="incomeTransporter" class="subStatisticsSelection statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2" value="per Transporter">'
            +'<input type="button" id="incomepCompany" class="subStatisticsSelection statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2" value="per Company">';
            //+'<input type="button" id="incomePeriod" class="subStatisticsSelection statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2" value="per Period">';

  $('.subSelectionArea').html(html).fadeIn(500);
}

function loadStatistics(element){

  var group = $('#mainSelected').val().toLowerCase();
  var typeValue = $(element).val();
  var type = typeValue.slice(4,typeValue.length).toLowerCase();
  var query = {};
  var dateFrom = getDate('dateFromButton');
  var dateTo = getDate('dateToButton');
  var data = {};

  query['dateFrom'] = dateFrom;
  query['dateTo'] = dateTo;

  data['group'] = group;
  data['type'] = type;
  data['query'] = query;

  console.log(data);

  getStatistics(function(response){

    console.log(response);
    var response = response.replace(/break/g, "\n");
    $('#responseTextArea').val(response);
  }, data);
}

function getDate(id){

  var date = ($('#' + id).val());

  if(date.indexOf('Date from') >= 0)
    return '2000-01-01';
  else if (date.indexOf('Date to') >= 0)
    return getTodayDate();

  return date;
}

function getTodayDate(){

  var today = new Date();
  var dd = today.getDate()+1;
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  today = yyyy+'-'+mm+'-'+dd;
  return today;
}
