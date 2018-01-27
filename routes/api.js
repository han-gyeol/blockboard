var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var db;
var mongoUrl = "mongodb://admin:admin@ds117148.mlab.com:17148/blockboard";


MongoClient.connect(mongoUrl, function(err, database) {
  if (err) throw err;
  console.log("Database connected!");
  db = database.db('blockboard').collection("block");
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('testing');
});

router.get('/board', function(req, res, next) {
  var query = {
    "data.display" : 1
  }
  db.find(query).toArray((err, result) => {
    var blocks = JSON.stringify(result);

    if(err) {
      console.log('Error: ' + err);
      res.send('Error: ');
    }
    else {
      res.send(blocks);
    }
  });

});

router.post('/add_block', function(req, res, next) {
  var body = req.body;
  db.find().sort({_id:-1}).limit(1).toArray((err, result) => {
    console.log(result)
    // replace old block
    var query = {
      "data.index" : body.index
    }
    var update = {
      $set : {
        "data.display" : 0
      }
    }
    db.update(query, update, { multi: true }, (err, result) => {
      if(err) console.log(err);
    });

    // add new block
    var id = result[0]._id+1;
    var newBlock = {
      _id : id,
      previousHash : body.previousHash,
      hash : body.hash,
      timestamp : body.timestamp,
      nonce : body.nonce,
      data : {
        name : body.name,
        char : body.char,
        index : body.index,
        display : 1
      }
    }
    db.insert(newBlock);
    
    if(err) {
      console.log('Error: ' + err);
      res.send('Error: ');
    }
    else {
      console.log('block added: ' + body.char);
      res.send('block added!');
    }
  });
});

module.exports = router;
