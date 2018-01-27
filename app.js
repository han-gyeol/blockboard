var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var api = require('./routes/api');

var app = express();
var db;


// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host : 'us-cdbr-iron-east-05.cleardb.net',
//   user : 'b37541c41271e5',
//   password : '3fd8cac25805ceb',
//   database : 'heroku_5669a3ca68cd31a'
// });

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://admin:admin@ds117148.mlab.com:17148/blockboard";

MongoClient.connect(mongoUrl, function(err, database) {
  if (err) throw err;
  console.log("Database connected!");
  db = database.db('blockboard');
  db.collection('block').findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
