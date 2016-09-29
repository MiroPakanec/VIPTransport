$(function(){
  var page = GetPageNameFromUrl();
  $('.nav a[href="'+page+'"]').parent().addClass('active');
});
