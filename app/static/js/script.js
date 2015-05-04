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
$('#userListe').remove(userName);

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

$('#userListe').append(userName);
}

$("#chatbox").append('Charles: '+userName + ' ist dem Chat beigetreten');


};

function schreiben () {
nachricht = $('#message').val();
if (nachricht === "" ) {
	
}


/*var url = "";
if (nachricht === "charles.logout") {
	location.reload();
}*/
else{

	$("#chatbox").append('<div class="item">' + userName + ": " + nachricht + '</div>');
$("input").val("");

}
};



