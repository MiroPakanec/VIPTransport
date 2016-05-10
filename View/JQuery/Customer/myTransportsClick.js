$(function(){

  $('#titleTransport').click(function(){

    closeElementsOnLoadTransport();
  });
});

function closeElementsOnLoadTransport(){

  hideDetails();
  hideConfirm();

  $('#orderTableArea').html('');
  $('.orderSearchBarArea').slideUp(500);
  manageTitleCss('#titleTransport', '#titleOrder', '#titleRoutes', '0.05');
  $('#responseArea').slideUp(300).html('');
}
