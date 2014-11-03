/**
 * Created by pan on 14-11-3.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('help/help',{layout:'layouts/layout','footerClass':''});
});

router.get('/faq', function(req, res) {
  res.render('help/faq',{layout:'layouts/layout','footerClass':''});
});

router.get('/manual', function(req, res) {
  res.render('help/manual',{layout:'layouts/layout','footerClass':''});
});

router.get('/search', function(req, res) {
  res.render('help/search',{layout:'layouts/layout','footerClass':''});
});

module.exports = router;
