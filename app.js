/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var fs = require("fs");
var crypto = require('crypto');
var flash = require('express-flash');
var https = require('https');
var http = require("http");
var path = require('path');
var querystring = require('querystring');
var Hogan = require("hogan.js");
var login_url = "https://my_saml_redirect";

var app = express();

var https_options = {
    key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('cacert.pem')
};

app.set('port', process.env.PORT || 443);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.set('key', fs.readFileSync('privkey.pem'));
app.set('cert', fs.readFileSync('cacert.pem'));
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('public/images', express.static(path.join(__dirname, 'public/images')));
app.use('public/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use('public/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./saml/saml')(app);
function secure(req,res,next){
      // Check session
      if(req.session.currentUser){
        next();
      }else{
        app.settings.saml.startAuth(req, res);
      }
    }
app.all('/', secure);
var server = https.createServer(https_options, app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function (req, res){
  res.redirect(login_url);
});
app.get('/clusterslist/', function (req, res){
  if(!req.session.currentUser){ req.flash('error', 'User is not signed in yet.'); res.redirect(login_url);}
  var servers = {};
  var i = 0;
  var email = (req.session.currentUser) ? req.session.currentUser.email : "";
  if (!email)
     res.redirect(login_url);
  var options = {
    host: 'apiserver.corp.somewhere.com'
    port: 443,
    path: '/',
    method: 'get',
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic some_key',
    }
  };
  var httpreq = https.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      res.setHeader('Content-Type', 'application/json');
      clustersJson += chunk;
    });
    response.on('end', function() {
      res.render('listcluster', clusters, function(err, html) {
      if ( html ){
      var h = html;
      console.log(h);
      res.send(h);
      }
      });
    });
  });
  httpreq.end();
});

app.get('/clusteredit/', function(req, res){
      if(!req.session.currentUser){req.flash('error', 'User is not signed in yet.'); res.redirect(login_url);}
     var name = req.query.name;
     if (!name || name == ""){
        req.flash('info', 'No cluster found by name=' + name + ' to edit.');
        res.redirect('/clusterslist/');
        return;
     }
     cluster = {};
     cluster.name = name;
     cluster.totalCpu = "";
     cluster.memorySize = "";
     clusters.forEach(function(item, index, array){
           if (item.name == name){
             cluster = item;
           }
     });

     res.render('modcluster', cluster, function(err, html) {
      var template = Hogan.compile(html);
      var h = template.render({'cluster':cluster});
        console.log('h='+h);
        res.setHeader('Content-Type', 'text/html');
        res.send(h);
     });
});

app.post('/clusteredit/', function(req, res){
      if(!req.session.currentUser){req.flash('error', 'User is not signed in yet.'); res.redirect(login_url);}
           cluster = {};
           cluster.name = req.body.name;
           cluster.cpuCount = req.body.totalCpu;
           cluster.memorySize = req.body.memorySize;
  var email = (req.session.currentUser) ? req.session.currentUser.email : "";
  if (!email)
     res.redirect(login_url);
  var options = {
    host: 'apiserver.corp.somewhere.com',
    port: 443,
    path: '/',
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic my_key',
      }
  };
  var post_data = JSON.stringify(cluster);
  console.log('post_data='+post_data);
  var httpreq = https.request(options, function (res) {
      res.setEncoding('utf8');
        console.log('post_data='+post_data);
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });
  httpreq.write(post_data);
  httpreq.end();
           req.flash('info', 'Cluster modified successfully.');
           res.redirect('/clusterslist/');
});
