
/*HANDLE*/
function HandleResponse(title, text){

  GenerateModal('response-modal', title, text);
  $('#myModal').modal('show');
}

/*CLEAR*/
$(function(){

  $('#myModal').on('hidden.bs.modal', function () {
   ClearElementValue($('#response-modal'));
  });
})


/*RESOURCES*/
function GetLoginTitle(){
  return 'Sign-in';
}

function GetRegisterTitle(){
  return 'Sign-up';
}

function GetNewOrderTitle(){
  return 'New order';
}
