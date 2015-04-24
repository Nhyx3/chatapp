var express = require('express');
var fs = require('fs');
var app = express();

app.use("/css", express.static('./static/css'));
app.use("/js", express.static('./static/js'));
app.use("/pictures", express.static('./static/pictures'));

app.get('/', function (req, res) {
    var data = fs.readFileSync('./view/index.html').toString();
    res.status(200).send(data);

});

app.get('/chatroom', function (req, res) {
    var data = fs.readFileSync('./view/Chatroom.html').toString();
    res.status(200).send(data);

});

var server = app.listen(3000, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
