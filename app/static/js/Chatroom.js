var nachricht =""
var userName = ""


$(document).ready(function(){
	
	$(".button").hover(
	 function(){
        $('.button').addClass("active");
    	$('.button').css( 'cursor', 'pointer' ); },
   	 function(){
       $('.button').removeClass("active");}
  	);

	
	$(".button").click(function() {
		nachricht = $('textarea[name=user_eingabe]').val();
			$(".anzeigefeld").append('<p>'  + nachricht + '</p>');}
	);

	/*$("#user_eingabe").focus(function() {
		$(this).css('outline-color', 'red') }
		);*/

	$('.button').click(function(){
        $('textarea[name=user_eingabe]').val('');}
    );
/*______________________________________________________________*/
    
    $('input').focus(function() {
    	$(this).css('outline-color', 'red');
    });
	

	$("#senden").click(function(event) {
		schreiben();
	});
		
	$("#message").keydown(function (event) {
		if (event.which !== 13) {
			return;
		}
		schreiben();
	});

	$(document).on('submit', '#löschen', function (event) {
		return false;
	});

	$("#button").click(function(event) {
		popup();
	});
	$("#userName").keydown(function (event) {
		if (event.which !== 13) {
			return;
		}
		popup();
});





function popup () {

userName = $('#userName').val();
if (userName === "") {
alert('Bitte erst Nutzernamen eingeben');
return;
}
else {
alert('Viel Fun beim Chatten ' + userName);
console.log("closing dialog");
dialog.close();

$('textarea[name=user_eingabe]').attr("disabled", false);
$('textarea[name=user_eingabe]').focus(); 
}

};

function schreiben () {
nachricht = $('#message').val();
$("#chatbox").append('<div class="item">' + userName + ": " + nachricht + '</div>');
$("input").val("");
};
    
   




