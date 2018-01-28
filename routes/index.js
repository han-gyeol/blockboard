var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var db;
var latest_block;
var mongoUrl = "mongodb://admin:admin@ds117148.mlab.com:17148/blockboard";


MongoClient.connect(mongoUrl, function(err, database) {
  if (err) throw err;
  console.log("Database connected!");
  db = database.db('blockboard').collection("block");
  db.find().sort({_id:-1}).limit(1).toArray((err, result) => {
    latest_block = result[0];
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BlockBoard' });
});

router.get('/mine', function(req, res, next) {
  res.render('mine');
});

router.get('/ledger', function(req, res, next) {
  res.render('ledger');
});

module.exports = router;
