$(function(){
  $(document).on('click', '.col-menu > a', function(e){
    e.preventDefault();
    var target = $(this).attr('href');
    $('html body').animate({
      scrollTop: $(target).offset().top
    }, 1000);
  });
});
