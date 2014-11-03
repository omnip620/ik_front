var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index',{layout:'layouts/layout','footerClass':''});
});

router.get('/mobileversion', function(req, res) {
  res.render('mobileversion',{layout:'layouts/layout','footerClass':''});
});

router.get('/htb', function(req, res) {
  res.render('htb',{layout:'layouts/layout','footerClass':''});
});



module.exports = router;
