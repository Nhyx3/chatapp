$(document).ready(function(){
	
	$(".button").hover(
	 function(){
        $('.button').addClass("active");
    	$('.button').css( 'cursor', 'pointer' ); },
   	 function(){
       $('.button').removeClass("active");}
  	);

	
	$(".button").click(function() {
		var nachricht = $('textarea[name=user_eingabe]').val();
			$(".anzeigefeld").append('<p>'  + nachricht + '</p>');}
	);

	/*$("#user_eingabe").focus(function() {
		$(this).css('outline-color', 'red') }
		);*/

	$('.button').click(function(){
        $('textarea[name=user_eingabe]').val('');}
    );

    

	
})
    
    
   




