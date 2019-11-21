var express = require('express');
var router = express.Router();

var db = require('../sql-js/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', db.getTest);

module.exports = router;
