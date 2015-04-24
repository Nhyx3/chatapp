var nachricht =""
var userName = ""

$(document).ready(function(){
$('#userName').focus();
$('#message').attr("disabled", true);
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

$("#exit").click(function(){
window.top.close();

});

$(document).on('submit', '#userForm', function (event) {
return false;
});

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

$('#message').attr("disabled", false);
$('#message').focus(); 
}

};

function schreiben () {
nachricht = $('#message').val();
$("#chatbox").append('<div class="item">' + userName + ": " + nachricht + '</div>');
$("input").val("");
};