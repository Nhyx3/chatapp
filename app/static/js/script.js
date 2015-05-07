var Chat = (function (){

	var currentUser = '';
	var pollingTimeout = null;

	var users = [];
	var messages = [];

	var fn = {

		init: function () {

			// setup
			$('#user-name').focus();
			$('#message').attr('disabled', true);
			$('input').focus(function() {
				$(this).css('outline-color', 'red');
			});
			fn.startPolling();


			// login handlers
			$('#login').click(function(event) {
				fn.login();
			});
			$('#user-name').keydown(function (event) {
				if (event.which !== 13) {
					return;
				}
				fn.login();
			});


			// message handlers
			$('#send').click(function(event) {
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
			$('#logout').click(function(){
				fn.logout();
			});
		},

		login: function () {
			currentUser = $('#user-name').val();
			if (currentUser === '') {
				alert('Gib erst deinen Namen ein!');
				return;
			}

			if (users.indexOf(currentUser) !== -1) {
				alert('Dieser Name wird schon verwendet!');
				return;
			}

			alert('Viel Fun beim Chatten ' + currentUser);
			dialog.close();

			$('#message').attr('disabled', false);
			$('#message').focus();


			fn.refreshChatLog();
			fn.sendMessage('Charles', currentUser + ' ist dem Chat beigetreten.');

			$.ajax({
				type: 'POST',
				url: '/users',
				data: {
					name: currentUser
				},
				success: fn.refreshUserList
			});
		},

		logout: function () {
			$.ajax({
				type: 'DELETE',
				url: '/users/' + currentUser
			});

			fn.sendMessage('Charles', currentUser + ' hat den Chat verlassen.');

			location.reload();
		},

		refreshChatLog: function () {
			$.ajax({
				type: 'GET',
				url: '/messages',
				success: function(data) {

					if (messages.length === data.length) {
						return;
					}

					$('#chat-log').html('');
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

					$('#user-list').html('');
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
			
			$.ajax({
				type: 'POST',
				url: '/messages',
				data: data,
				success: fn.refreshChatLog
			});

		},

		appendToChatLog: function (message) {
			$('#chat-log').append('<div>[' + message.timestamp + '] ' + message.user + ': ' + message.text + '</div>');
			$('#chat-log').animate({scrollTop: $('#chat-log').prop('scrollHeight')}, 500);
			messages.push(message);
		},

		appendToUserList: function (user) {
			$('#user-list').append('<div>' + user + '</div>');
			users.push(user);
		},

		startPolling: function () {
			fn.refreshChatLog();
			fn.refreshUserList();

			pollingTimeout = setTimeout(fn.startPolling, 1000);
		}
	};

	return fn;

})();

$(document).ready(function() {
	Chat.init();
});
