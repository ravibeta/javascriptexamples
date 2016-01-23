
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var fs = require("fs");
var crypto = require('crypto');
var flash = require('express-flash');
//var tls = require('tls');
var https = require('https');
var http = require("http");
var path = require('path');
var querystring = require('querystring');
var Hogan = require("hogan.js");
var login_url = "https://okta.com/app/template_saml_2_0/exk13xxxxxxxo/sso/saml";

var app = express();

var https_options = {
    key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('cacert.pem')
};

// all environments
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
//app.use(express.session({ secret: 'your secret here' }));
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
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

//app.get('/', routes.index);
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
     email = 'rajamani@my.com';
/* {s:12:"access_token";s:695:"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwNzZlMGNhOS1hM2UwLTRhNmEtODlkNi1lNTNhOTE3OTViNmYiLCJzdWIiOiJjaWZzYXBpIiwiYXV0aG9yaXRpZXMiOlsiY2xpZW50cy5hZG1pbiIsImNsaWVudHMud3JpdGUiLCJjbGllbnRzLnJlYWQiLCJ1YWEuYWRtaW4iLCJjbGllbnRzLnNlY3JldCIsInVhYS5yZXNvdXJjZSJdLCJzY29wZSI6WyJ1YWEuYWRtaW4iLCJ1YWEucmVzb3VyY2UiLCJjbGllbnRzLmFkbWluIiwiY2xpZW50cy53cml0ZSIsImNsaWVudHMucmVhZCIsImNsaWVudHMuc2VjcmV0Il0sImNsaWVudF9pZCI6ImNpZnNhcGkiLCJjaWQiOiJjaWZzYXBpIiwiYXpwIjoiY2lmc2FwaSIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJpYXQiOjE0NTM1MjY5OTIsImV4cCI6MTQ1MzUzMDU5MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3VhYS9vYXV0aC90b2tlbiIsImF1ZCI6WyJjaWZzYXBpIiwidWFhIiwiY2xpZW50cyJdfQ.cs1C0MweQ91a7-Yu7W50dPN8zqnAP4eQqgZE99VrgXc";s:4:"auth";s:34:"Basic some_token";} */
  var options = {
    host: 'itcapi.paas-stg.corp.my.com',
    port: 443,
    path: '/mesos-broker/v1/clusters/',
    method: 'get',
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic some_token',
    }
  };
  var httpreq = https.request(options, function (response) {
    response.setEncoding('utf8');
    clustersJson = ''
    response.on('data', function (chunk) {
      res.setHeader('Content-Type', 'application/json');
      clustersJson += chunk;
    });
    response.on('end', function() {
      //console.log('clustersJSON='+clustersJson);
      clusters = JSON.parse(clustersJson)["open-stack"];
      console.log(JSON.stringify(clusters));
      res.setHeader('Content-Type', 'text/html');

      res.render('listcluster', clusters, function(err, html) {
      //var email = (req.session.currentUser) ? req.session.currentUser.email : "";
      //console.log('html_len='+html.length);
      //var h  = Hogan.compile(html).render({"message" : email});
      if ( html ){
      var h = html;
      console.log(h);
      insertion = "<tr><td>{{ cluster.name }}</td><td>{{ cluster.cpuCount }}</td><td>{{ cluster.memorySize }}</td><td>{{ cluster.storageSize }}</td><td>{{ cluster.heartBeat }}</td><td><select class=\"actionServer\" name=\"action_{{ cluster.name }}\" id=\"action_{{ cluster.name }}\"><option value=\"\">Action</option><option value=\"delete\">Delete Cluster</option><option value=\"modify\">Modify Cluster</option><option value=\"grpmgr\">Manage Groups</option></select></td></tr>";
      var template = Hogan.compile(insertion);
      data = '';
      clusters.forEach(function(cluster, index, array){
           var row = template.render({'cluster':cluster});
           data += row;
           console.log('data='+row);
      });
      h = html.replace('LIST_OF_CLUSTERS', data);
      if(req.session.currentUser){
         console.log('currentUser='+req.session.currentUser);
         h = h.replace('EMAIL_OF_USER', req.session.currentUser.email.split('@')[0]);
      }else{
        //app.settings.saml.startAuth(req, res);
      }
      h  = h.replace('{{ title }}', 'List of Clusters');
      console.log('clusters='+JSON.stringify(clusters));
      h = h.replace('CLUSTERS_JSON', JSON.stringify(clusters));
      res.setHeader('Content-Type', 'text/html');
      res.send(h);
      }
      });
    });
  });
  httpreq.end();
});
/*
app.get('/clusterslist/', function (req, res){
      //if(!req.session.currentUser){res.redirect("https://adobe-stage.okta.com/app/template_saml_2_0/exk13st3fkyBqGs8Z1d8/sso/saml");}
      if(!req.session.currentUser){res.redirect(login_url);}
      //console.log('session='+req.session);
      //console.log('user='+req.session.currentUser);
      res.setHeader('Content-Type', 'text/html');
      //res.flash('info', 'You are logged in as ' + req.session.currentUser.email);
      res.render('listcluster', clusters, function(err, html) {
      var email = (req.session.currentUser) ? req.session.currentUser.email : "";
      var h  = Hogan.compile(html).render({"message" : email});
      insertion = "<tr><td>{{ cluster.name }}</td><td>{{ cluster.cpuCount }}</td><td>{{ cluster.memorySize }}</td><td>{{ cluster.storageSize }}</td><td>{{ cluster.heartBeat }}</td><td><select class=\"actionServer\" name=\"action_{{ cluster.name }}\" id=\"action_{{ cluster.name }}\"><option value=\"\">Action</option><option value=\"delete\">Delete Cluster</option><option value=\"modify\">Modify Cluster</option><option value=\"detail\" hidden=\"true\" >Detail Cluster</option><option value=\"grpmgr\">Manage Groups</option></select></td></tr>";
      var template = Hogan.compile(insertion);
      data = '';
      clusters.forEach(function(cluster, index, array){
           var row = template.render({'cluster':cluster});
           data += row;
           console.log('data='+row);
      });
      h = h.replace('LIST_OF_CLUSTERS', data);
      if(req.session.currentUser){
         console.log('currentUser='+req.session.currentUser);
         h = h.replace('EMAIL_OF_USER', req.session.currentUser.email.split('@')[0]);
      }else{
        //app.settings.saml.startAuth(req, res);
      }
      h  = h.replace('{{ title }}', 'List of Clusters');
      console.log('clusters='+JSON.stringify(clusters));
      h = h.replace('CLUSTERS_JSON', JSON.stringify(clusters));
      res.setHeader('Content-Type', 'text/html');
      res.send(h);
      });
});
*/

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
           //cluster.marathonGroup = 'mesos_' + req.body.landscape + "_" + req.body.name;
  var email = (req.session.currentUser) ? req.session.currentUser.email : "";
  if (!email)
     email = 'rajamani@my.com';
  var options = {
    host: 'brokerurl.corp.com',
    port: 443,
    path: '/clusters',
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json', //x-www-form-urlencoded',
    'Authorization': 'Basic sometoken',
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

app.get('/clusterdelete/', function(req, res){
  if(!req.session.currentUser){req.flash('error', 'User is not signed in yet.'); res.redirect(login_url);}
     var name = req.query.name;
     if (!name || name == ""){
        req.flash('info', 'No cluster found by name=' + name + ' to delete.');
        res.redirect('/clusterslist/');
        return;
     }
  var email = (req.session.currentUser) ? req.session.currentUser.email : "";
  if (!email)
     email = 'rajamani@my.com';
  var options = {
    host: 'my.com',
    port: 443,
    path: '/mesos-broker/v1/cluster/open-stack/' + name + '/',
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json', //x-www-form-urlencoded',
    'Authorization': 'Basic some_token',
      }
  };
  var httpreq = https.request(options, function (res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });
  httpreq.end();
  req.flash('info', 'Cluster deleted successfully.');
  res.redirect('/clusterslist/');
});

app.get('/clusteradd/', function(req, res){
     if(!req.session.currentUser){req.flash('error', 'User is not signed in yet.'); res.redirect(login_url);}
     cluster = {};
     res.render('addcluster', cluster, function(err, html) {
      var h = html;
      if(req.session.currentUser){
         console.log('currentUser='+req.session.currentUser);
         h = html.replace('EMAIL_OF_USER', req.session.currentUser.email.split('@')[0]);
      }
      var template = Hogan.compile(h);
      h = template.render({'cluster':cluster});
        res.setHeader('Content-Type', 'text/html');
        res.send(h);
     });
});

app.post('/clusteradd/', function(req, res){
      console.log('request='+req.body.totalCpu);
      if(!req.session.currentUser){req.flash('error', 'User is not signed in yet.'); res.redirect(login_url);}
           cluster = {};
           cluster.name = req.body.name;
           cluster.cpuCount = req.body.totalCpu;
           cluster.memorySize = req.body.memorySize;
           cluster.environment = req.body.landscape;
           console.log('sshKey='+req.body.sshKey);
           cluster.sshKey = req.body.sshKey;
           cluster.marathonGroup = 'mesos_' + req.body.landscape + "_" + req.body.name;
           console.log('cluster_data='+JSON.stringify(cluster));
  var email = (req.session.currentUser) ? req.session.currentUser.email : "";
  if (!email)
     email = 'rajamani@my.com';
  var options = {
    host: 'my.com',
    port: 443,
    path: '/cluster/',
    method: 'POST',
    headers: {
    'Content-Type': 'application/json', //x-www-form-urlencoded',
    'Authorization': 'Basic some_token',
      }
  };
//var querystring = require('querystring');
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

           clusters.splice(0, 1, cluster);
           console.log('cluster added='+cluster.toString());
           req.flash('info', 'Cluster added successfully.');
           res.redirect('/clusterslist/');
});
