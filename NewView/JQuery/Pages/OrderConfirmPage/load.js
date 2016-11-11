$(function(){
  LoadSession();

  GenerateNavbar();
  GenerateFooter();

  LoadStickers();
  LoadOrders();
  LoadCars();
  LoadUsers('transporter');
});
