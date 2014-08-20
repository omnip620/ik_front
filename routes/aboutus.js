var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('aboutus',{layout:'layouts/layout','footerClass':'bg-dark'});
});

module.exports = router;