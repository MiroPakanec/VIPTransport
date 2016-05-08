$(function(){

  $('#titleTransport').click(function(){

    closeElementsOnLoadTransport();
  });
});

function closeElementsOnLoadTransport(){

  $('.confirmFormArea').fadeOut(500);
  setTimeout(function(){

      $('.confirmArea').slideUp(300);
      $('#orderTableArea').css({'height' : '40%'});

  },500);

  $('#orderTableArea').html('');
  $('.orderSearchBarArea').slideUp(500);
  manageTitleCss('#titleTransport', '#titleOrder', '#titleRoutes', '0.05');
  $('#responseArea').slideUp(300).html('');
}
