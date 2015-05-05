var Chat = (function (){

	var currentUser = '';
	var pollingInterval = null;

	var users = [];
	var messages = [];

	var fn = {

		init: function () {

			// init
			$('#userName').focus();
			$('#message').attr('disabled', true);
			$('input').focus(function() {
				$(this).css('outline-color', 'red');
			});


			// login handlers
			$('#button').click(function(event) {
				fn.login();
			});
			$('#userName').keydown(function (event) {
				if (event.which !== 13) {
					return;
				}
				fn.login();
			});
			$(document).on('submit', '#userForm', function (event) {
				return false;
			});


			// message handlers
			$('#senden').click(function(event) {
				fn.sendMessage();
			});
			$('#message').keydown(function (event) {
				if (event.which !== 13) {
					return;
				}
				fn.sendMessage();
			});
			$(document).on('submit', '#löschen', function (event) {
				return false;
			});


			// logout handlers
			$('#exit').click(function(){
				fn.logout();
			});
		},

		login: function () {

			currentUser = $('#userName').val();
			if (currentUser === '') {
				alert('Bitte erst Nutzernamen eingeben');
				return;
			}

			alert('Viel Fun beim Chatten ' + currentUser);
			dialog.close();

			$('#message').attr('disabled', false);
			$('#message').focus();


			fn.refreshChatLog();
			fn.sendMessage('Charles', currentUser + ' ist dem Chat beigetreten');

			fn.appendToUserList(currentUser);

			$.ajax({
				type: 'POST',
				url: '/users',
				data: {
					name: currentUser
				}
			});

			pollingInterval = setInterval(function () {
				fn.refreshChatLog();
				fn.refreshUserList();
			}, 1000);

		},

		logout: function () {

			$.ajax({
				type: 'DELETE',
				url: '/users/' + currentUser
			});

			$('#userListe').remove(currentUser);
		},

		refreshChatLog: function () {
			$.ajax({
				type: 'GET',
				url: '/messages',
				success: function(data) {

					if (messages.length === data.length) {
						return;
					}

					$('#chatbox').html('');
					messages = [];

					for (var i in data) {
						var message = data[i];
						fn.appendToChatLog(message);
					};

				},
				error: function(data){console.log('Error')}
			});
		},

		refreshUserList: function () {
			$.ajax({
				type: 'GET',
				url: '/users',
				success: function(data) {

					if (users.length === data.length) {
						return;
					}

					$('#userListe').html('');
					users = [];

					for (var i in data) {
						var user = data[i];
						fn.appendToUserList(user);
					};

				},
				error: function(data){console.log('Error')}
			});
		},

		sendMessage: function (user, text) {

			if ( ! text) {
				text = $('#message').val();
				$('#message').val('');
			}

			if (text === '') {
				return;
			}

			if ( ! user) {
				user = currentUser;
			}

			var date = new Date();
			var formattedTime = date.toLocaleTimeString();


			var data = {
				user:      user,
				text:      text,
				timestamp: formattedTime
			};

			fn.appendToChatLog(data);
			
			$.ajax({
				type: 'POST',
				url: '/messages',
				data: data
			});

		},

		appendToChatLog: function (message) {
			console.log(message.timestamp);

			

			
			$('#chatbox').append('<div class="item">[' + message.timestamp + '] ' + message.user + ': ' + message.text + '</div>');
			messages.push(message);
		},

		appendToUserList: function (user) {
			$('#userListe').append('<div class="item">' + user + '</div>');
			users.push(user);
		}
	};

	return fn;

})();

$(document).ready(function() {
	Chat.init()
});
