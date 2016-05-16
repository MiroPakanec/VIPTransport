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

    subStatisticsSelectionClick(element);

    if($(this).attr('id') == 'incomeCompany')
      incomeCompanyClick();

    //button colors
    loadStatistics();
  });

  //main selection area buttons
  $('#mainIncome').on('click', function(){

    generateIncomeSubSelectionArea();
    $('#incomeCar').trigger('click');
  });

  //company selection buttons
  $(document).on('click', '.paymentTypeButton', function(){

    var element = $(this);
    var value = $(element).val();

    //subtypeCompany
    companyStatisticsSelectionClick(element);
    $('#subtypeCompany').val(value);
    loadStatistics();
  });

  //date selections
  $('#dateFromButton').on('click', function(){
    $("#datePickerAreaFrom").slideToggle(300);
  });

  $('#dateToButton').on('click', function(){
    $("#datePickerAreaTo").slideToggle(300);
  });

  $('#dateClearButton').on('click', function(){
    $('#dateFromButton').val('Date from');
    $('#dateToButton').val('Date to');
    loadStatistics();
  })
});

function mainStatisticsSelectionClick(element){

  var value = $(element).val();

  $('.mainStatisticsSelection').each(function(){
    $(this).removeClass('mainStatisticsSelectionSelected');
  });

  $('#mainSelected').val(value);
  $(element).addClass('mainStatisticsSelectionSelected');

  //hide payment row
  $('.companySubSelectionArea').html('').fadeOut(500);
}

function subStatisticsSelectionClick(element){

  var typeValue = $(element).val();
  var type = typeValue.slice(4,typeValue.length).toLowerCase();

  $('.subStatisticsSelection').each(function(){
    $(this).removeClass('subStatisticsSelectionSelected');
  });

  $('#subSelected').val(type);
  $(element).addClass('subStatisticsSelectionSelected');

  //hide payment row
  $('.companySubSelectionArea').html('').fadeOut(500);
}

function incomeCompanyClick(){

  var html = getCompanySubAreaHtml();
  $('.companySubSelectionArea').html(html).fadeIn(500);
}

function companyStatisticsSelectionClick(element){

  $('.paymentTypeButton').each(function(){
    $(this).removeClass('companyStatisticsSelectionSelected');
  });

  $(element).addClass('companyStatisticsSelectionSelected');
}

function getCompanySubAreaHtml(){

  var html =  '<input type="button" id="paymentAllButton" class="companyStatisticsSelectionSelected statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2 paymentTypeButton" value="All">'
             +'<input type="button" id="invoiceButton" class="statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2 paymentTypeButton" value="Invoice">'
             +'<input type="button" id="cashButton" class="statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2 paymentTypeButton" value="Cash">'
             +'<input type="button" id="creditCardButton" class="statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2 paymentTypeButton" value="Credit Card">'
             +'<input type="hidden" class="subtype" id="subtypeCompany" value="All">';
  return html;
}

function generateIncomeSubSelectionArea(){

  $('.subSelectionArea').html('').hide();
  var html = '<input type="button" id="incomeCar" class="subStatisticsSelection subStatisticsSelectionSelected statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2" value="per Car">'
            +'<input type="button" id="incomeTransporter" class="subStatisticsSelection statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2" value="per Transporter">'
            +'<input type="button" id="incomeCompany" class="subStatisticsSelection statisticsButton smallText col-xs-12 col-sm-12	col-md-2 col-lg-2" value="per Company">'
            +'<input type="hidden" value="car" id="subSelected">'
  $('.subSelectionArea').html(html).fadeIn(500);
}

function loadStatistics(){

  var group = $('#mainSelected').val().toLowerCase();
  var type = $('#subSelected').val();
  var payment = $('#subtypeCompany').val();
  var query = {};
  var dateFrom = getDate('dateFromButton');
  var dateTo = getDate('dateToButton');
  var data = {};

  if(payment == null)
    payment = 'null';

  query['dateFrom'] = dateFrom;
  query['dateTo'] = dateTo;
  query['payment'] = payment;

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
