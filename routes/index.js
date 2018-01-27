var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BlockBoard' });
});

router.get('/mine', function(req, res, next) {
  res.render('mine', { title: 'BlockBoard' });
});

router.get('/ledger', function(req, res, next) {
  res.render('ledger', { title: 'BlockBoard' });
});

module.exports = router;
