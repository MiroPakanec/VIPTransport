$(function(){

    getSession(function(data){

      if(data.email.length == 0){
          window.location="mainPage.html";
      }

      if(data.type == 'customer'){

        //generate page for custoemr
        generateCustomerButtons();
        generateTableOrdersCustomer();
      }
    })
})

function generateTableOrdersCustomer(){

  var html = '<table class="smallText">' +
                '<tr class = "tableHeader">' +
                  '<td>Date</td>' +
                  '<td>Departure address</td>' +
                  '<td>Arrival address</td>' +
                  '<td>Pasangers</td>' +
                  '<td>Payment</td>' +
                  '<td>Operation</td>';
                '</tr>' +
             '</table>';

   $('#orderTableArea').html(html);
}
