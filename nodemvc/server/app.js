
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var querystring = require('querystring');
var Hogan = require("hogan.js");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here' }));
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('public/images', express.static(path.join(__dirname, 'public/images')));
app.use('public/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use('public/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/devserverslist/', function (req, res){
  var servers = {};
  var options = {
    host: '10.5.250.38',
    port: 8388,
    path: '/serverslist/',
    method: 'get'
  };
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    serversJson = ''
    response.on('data', function (chunk) {
      res.setHeader('Content-Type', 'application/json');
      serversJson += chunk;
    });
    response.on('end', function() {
      //console.log(serversJson);
      servers = JSON.parse(serversJson);
      res.setHeader('Content-Type', 'text/html');
      //res.render('index',  servers);

      res.render('index', servers, function(err, html) {
      //console.log('html='+html);
      insertion = "<tr><td>{{ server.pk }}</td><td>{{ server.fields.server_id }}</td><td>{{ server.fields.remote_ip }}</td><td>{{ server.fields.platform }}</td><td>{{ server.fields.os_type }}</td><td>{{ server.fields.status }}</td><td><input type=\"button\"  class=\"btn-primary\" value=\"Details\" onclick=\"openDetails('/devserversdetails/?id={{ server.pk }}');\"></input></td></tr>";
      //var Hogan = require("hogan.js");
      var template = Hogan.compile(insertion);
      data = '';
      servers.forEach(function(server, index, array){
           var row = template.render({'server':server});
           data += row;
           console.log('data='+row);
      });
      var h = html.replace('LIST_OF_SERVERS', data);
      res.setHeader('Content-Type', 'text/html');
      res.send(h);
      });
    });
  });
  httpreq.end();
});

app.get('/devserverslistjsonr/', function (req,res){
  var servers = {};
  var options = {
    host: '10.5.250.38',
    port: 8388,
    path: '/serverslist/',
    method: 'get'
  };
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    serversJson = ''
    response.on('data', function (chunk) {
      res.setHeader('Content-Type', 'application/json');
      serversJson += chunk;
    });
    response.on('end', function() {
      res.setHeader('Content-Type', 'application/json');
      res.send(serversJson);
    });
  });
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
  httpreq.end();
});


app.post('/devserversattributeedit/', function (req, res) {
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
  console.log('Making a call...');
  var options = {
    host: '10.5.250.38',
    port: 8388,
    path: '/server/v1/attributeedit?id='+id,
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

app.get('/flavors/', function (req,res){
  var servers = {};
  var options = {
    host: '10.5.250.38',
    port: 8388,
    path: '/flavorslist/',
    method: 'get'
  };
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    serversJson = ''
    response.on('data', function (chunk) {
      res.setHeader('Content-Type', 'application/json');
      serversJson += chunk;
    });
    response.on('end', function() {
      res.setHeader('Content-Type', 'application/json');
      res.send(serversJson);
    });
  });
  httpreq.end();
});

//app.listen(8490);
