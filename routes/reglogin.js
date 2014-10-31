/**
 * Created by pan on 14-8-13.
 */
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res) {
    res.render('reglogin/login');
});
router.get('/login', function(req, res) {
    res.render('reglogin/login');
});

/* GET register page. */
router.get('/register', function(req, res) {
    res.render('reglogin/register');
});

/* GET init page. */
router.get('/init', function(req, res) {
    res.render('reglogin/init');
});

/* GET findpwd page. */
router.get('/findpwd', function(req, res) {
    res.render('reglogin/findpwd');
});

router.get('/findpwd2', function(req, res) {
  res.render('reglogin/findpwd2');
});


router.get('/flogin', function(req, res) {
  res.render('reglogin/flogin');
});


router.get('/changepwd', function(req, res) {
  res.render('reglogin/changepwd');
});

router.get('/completeinfo', function(req, res) {
  res.render('reglogin/completeinfo');
});

router.get('/welcome', function(req, res) {
  res.render('reglogin/welcome',{layout:false});
});
module.exports = router;
