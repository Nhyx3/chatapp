var express = require('express');
var fs = require('fs');

var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/css", express.static('./static/css'));
app.use("/img", express.static('./static/img'));
app.use("/js", express.static('./static/js'));


var messages = [];
var users = ['Charles'];


// default route
app.get('/', function (req, res) {
    var data = fs.readFileSync('./view/index.html').toString();
    res.status(200).send(data);
});


// messages routes
app.get('/messages', function (req, res) {
	res.status(200).send(messages);
});

app.post('/messages', function (req, res) {
    var date = new Date();

    req.body.timestamp = date.toLocaleTimeString();
	messages.push(req.body);
	res.send(200);
});


// users routes
app.get('/users', function (req, res) {
	res.status(200).send(users);
});

app.post('/users', function (req, res) {
	users.push(req.body.name);
	res.send(200);
});

app.delete('/users/:id', function (req, res) {
	var index = users.indexOf(req.params.id);
	if (index > -1) {
	    users.splice(index, 1);
	}

	res.send(200);
});


// start server
var server = app.listen(3000, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
