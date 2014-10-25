var http = require('http'),
    express = require('express'),
    path = require('path');

MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
CollectionDriver = require('./collectionDriver').CollectionDriver;

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var mongoHost = 'localHost';
var mongoPort = 27017;
var collectionDriver;

var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));
mongoClient.open(function(err, mongoClient) {
  if (!mongoClient) {
      console.error("Error! Exiting... Must start MongoDB first");
      process.exit(1);
  }
  var db = mongoClient.db("MyDatabase");
  collectionDriver = new CollectionDriver(db);
});
app.use(express.bodyParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/:collection', function(req, res) { //A
   var params = req.params; //B
   collectionDriver.findAll(req.params.collection, function(error, objs) { //C
          if (error) { res.send(400, error); } //D
              else {
                  if (req.accepts('html')) { //E
                  res.render('data',{objects: objs, collection: req.params.collection}); //F
              } else {
                  res.set('Content-Type','application/json'); //G
                  res.send(200, objs); //H
              }
         }
        });
});

app.get('/:collection/:entity', function(req, res) { //I
   var params = req.params;
   var entity = params.entity;
   var collection = params.collection;
   if (entity) {
       collectionDriver.get(collection, entity, function(error, objs) { //J
          if (error) { res.send(400, error); }
          else { res.send(200, objs); } //K
       });
   } else {
      res.send(400, {error: 'bad url', url: req.url});
   }
});


app.post('/:collection', function(req, res) { //A
    var object = { "api_key": generate_key(req.body)};
    var collection = req.params.collection;
    collectionDriver.save(collection, object, function(err,docs) {
          if (err) { res.send(400, err); }
          else { res.send(201, docs); } //B
     });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.post('/keys/create', function (req, res) {
    var result = generate_key(req.body.pattern).result;
    res.render('result', {'api-key': result});
});

function generate_key(input) {
var r = require('node-uuid')()
return require('crypto').createHash('sha256').update(r).update('NFSsalt').digest('hex');
}
