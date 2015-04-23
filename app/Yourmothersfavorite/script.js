function zeigeFenster() {
	  dialog.showModal();
	};



$(document).ready(function(){
 $('input').focus(function() {
     $(this).css('outline-color', 'red');
    });


$("#button").click(function(){
var username = $('input[name=checkListItem]').val();

if (username !== "") {
    alert('Viel Fun beim Chatten ' + username);
    dialog.close();
} else {
    alert('Bitte erst Nutzernamen eingeben');
}

});



});


