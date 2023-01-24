const path = require("path");
var express = require('express');
var router = express.Router();

/* GET React frontend */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, '..', "public", "index.html"));
});

module.exports = router;
