var express = require('express');
var querystring = require('querystring');
var http = require('http');

var app = express();
app.get('/devserverslist/', function (req,res){
  var servers = {};
  var options = {
    host: '10.5.250.38',
    port: 8388,
    path: '/server/v1/servers',
    method: 'get'
  };
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      console.log("body: " + chunk);
      res.setHeader('Content-Type', 'application/json');
      res.send(chunk);
    });
    response.on('end', function() {
    })
  });
  httpreq.write(data);
  httpreq.end();
});

app.get('/devserversdetails/', function(req, res){
  var id = req.query['id'];
  var options = {
    host: '10.5.250.38',
    port: 8388,
    path: '/server/v1/attributes?id='+id,
    method: 'get'
  };
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      console.log("body: " + chunk);
      res.setHeader('Content-Type', 'application/json');
      res.send(chunk);
    });
    response.on('end', function() {
    })
  });
  httpreq.write(data);
  httpreq.end();
});


app.post('/devserversattributeedit', function (req, res) {
  var id = req.query['id'];
  var name = req.body.name;
  var value = req.body.value;
  var idval = querystring.stringify({
    id: id,
  });
  var data = querystring.stringify({
      name: name,
      value: value
  });

  var options = {
    host: '10.5.250.38',
    port: 8388,
    path: '/devserversattributeedit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      console.log("body: " + chunk);
      res.setHeader('Content-Type', 'application/json');
      res.send(chunk);
    });
    response.on('end', function() {
      res.send('ok');
    })
  });
  httpreq.write(data);
  httpreq.end();
});

app.listen(8490);
