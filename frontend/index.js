var http = require('http');
var express = require('express');

var PORT = 80;

var app = express();
var server = http.createServer(app);

//Endpoint to configure Graph color
var chartColor = process.env.CHART_COLOR || '#FF00FF';
app.get('/color', (req, res) => res.send(chartColor))

app.use(express.static(__dirname + '/static'))
server.listen(PORT, function() {
	console.log("server is listening on port", PORT);
});

