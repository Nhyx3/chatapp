var express = require('express');
var fs = require('fs');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/css", express.static('./static/css'));
app.use("/js", express.static('./static/js'));
app.use("/pictures", express.static('./static/pictures'));

var messages = [];

app.get('/', function (req, res) {
    var data = fs.readFileSync('./view/index.html').toString();
    res.status(200).send(data);

});


app.get('/getmessages', function (req, res) {
	res.status(200).send(messages);
	console.log(req.body);
});



app.post('/messages', function (req, res) {
	messages.push(req.body);

});

app.post('/newuser', function (req, res) {
	messages.push(req.body);
	
});


var server = app.listen(3000, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
