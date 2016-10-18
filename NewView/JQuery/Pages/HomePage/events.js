$(function(){

  $(document).on('click', '.btn-link', function(){
    window.location = $(this).attr('href');
  });
})
