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
            +'<input type="button" id="incomepCompany" class="subStatisticsSelection statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2" value="per Company">'
            +'<input type="button" id="incomePeriod" class="subStatisticsSelection statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2" value="per Period">';

  $('.subSelectionArea').html(html).fadeIn(500);
}

function loadStatistics(element){

  var group = $('#mainSelected').val().toLowerCase();
  var typeValue = $(element).val();
  var type = typeValue.slice(4,typeValue.length).toLowerCase();
  var data = {};

  data['group'] = group;
  data['type'] = type;

  getStatistics(function(data){

    console.log(data);
  }, data);
}
