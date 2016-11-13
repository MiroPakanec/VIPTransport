function DisableFutureRoutesConfirmation(){

  var disable = true;

  $('.btn-table-confirm').each(function(){
    var cell = $(this).closest('.cell-confirm');
    var sibling = $(cell).siblings('.row-date');
    var dateString = $(sibling).html();

    if(dateString == null || dateString.length <= 0){
      HideButton(this);
    }

    var date = new Date(dateString);
    var now = new Date();

    if(date == 'Invalid Date'){
      HideButton(this);
    }

    if(date > now){
      HideButton(this);
    }
  });
}

function HideButton(button){

  $(button).addClass('invisible');
}
