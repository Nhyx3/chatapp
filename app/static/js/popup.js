$(document).ready(function(){
    
$('input').focus(function() {
     $(this).css('outline-color', 'red');
    });

$("#button").click(function(){
var username = $('input[name=checkListItem]').val();

if (username !== "") {
    alert('Viel Fun beim Chatten ' + username);
} else {
    alert('Bitte erst Nutzernamen eingeben');
}

});



    var popup_zustand = false;
 
        if(popup_zustand === false) {
            $("#popup").fadeIn("normal");
            $("#hintergrund").css("opacity", "0.7");
            $("#hintergrund").fadeIn("normal");
            popup_zustand = true;

 
    return false;
    };
 
    $(".schliessen").click(function() {
 
        if(popup_zustand === true) {
            $("#popup").fadeOut("normal");
            $("#hintergrund").fadeOut("normal");
            popup_zustand = false;
        }
 
    });
 
});



/*jQuery(function($) {
 
    var popup_zustand = false;
 
    $(".popup_oeffnen").click(function() {
 
        if(popup_zustand == false) {
            $("#popup").fadeIn("normal");
            $("#hintergrund").css("opacity", "0.7");
            $("#hintergrund").fadeIn("normal");
            popup_zustand = true;
        }
 
    return false;
    });
 
    $(".schliessen").click(function() {
 
        if(popup_zustand == true) {
            $("#popup").fadeOut("normal");
            $("#hintergrund").fadeOut("normal");
            popup_zustand = false;
        }
 
    });
 
}); */