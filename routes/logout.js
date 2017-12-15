var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/userSchema.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session){
        req.session.destroy(function (err) {
            if(err){
                return next(err);
            }else{
                return res.redirect('/login');
            }
        })
    }
});

module.exports = router;