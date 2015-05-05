var nachricht = "";
var userName = "";
var pollingInterval;
var cmessages = [];

$(document).ready(function() {

	// init
	$('#userName').focus();
	$('#message').attr("disabled", true);
	$('input').focus(function() {
		$(this).css('outline-color', 'red');
	});


	// login handlers
	$("#button").click(function(event) {
		login();
	});
	$("#userName").keydown(function (event) {
		if (event.which !== 13) {
			return;
		}
		login();
	});
	$(document).on('submit', '#userForm', function (event) {
		return false;
	});


	// message handlers
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


	// logout handlers
	$("#exit").click(function(){
		$('#userListe').remove(userName);
	});

});



function login () {

	userName = $('#userName').val();
	if (userName === "") {
		alert('Bitte erst Nutzernamen eingeben');
		return;
	} else {
		alert('Viel Fun beim Chatten ' + userName);
		console.log("closing dialog");
		dialog.close();

		$('#message').attr("disabled", false);
		$('#message').focus(); 

		$('#userListe').append(userName);
	}

	$("#chatbox").append('Charles: '+userName + ' ist dem Chat beigetreten');
	var data = {

		charles: ('Charles: '+userName + ' ist dem Chat beigetreten');
	}
	$.ajax({
		type: "POST",
		url: "/newuser",
		data: data
	});

	//neue nachrichten checken
	pollingInterval = setInterval(function () {
		$.ajax({
		type: "GET",
		url: "/getmessages",
		success: function(data){
			var i = cmessages.length;
			while(cmessages.length < data.length){

				$("#chatbox").append('<div class="item">' + data[i].user + ": " + data[i].text + '</div>');
				cmessages.push(data[i].text);
				i++;
			};			
		},
		error: function(data){console.log("Error")}
	});

	}, 1000);

};

function schreiben () {

	nachricht = $('#message').val();
	if (nachricht === "" ) {
		return;
	}

	$("#chatbox").append('<div class="item">' + userName + ": " + nachricht + '</div>');
	cmessages.push(nachricht);
	$("input").val("");

	var data = {
		user:      userName,
		text:      nachricht,
		timestamp: Date.now()
	};
	$.ajax({
		type: "POST",
		url: "/messages",
		data: data
	});



};



