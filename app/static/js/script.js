var nachricht = "";
var userName = "";
var pollingInterval;

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

	pollingInterval = setInterval(function () {

	}, 1000);

};

function schreiben () {

	nachricht = $('#message').val();
	if (nachricht === "" ) {
		return;
	}

	$("#chatbox").append('<div class="item">' + userName + ": " + nachricht + '</div>');
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

	/*
	var url = "";
	if (nachricht === "charles.logout") {
		location.reload();
	}
	*/
};



