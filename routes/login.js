var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/userSchema.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/', function (req, res, next) {
    if (req.body.username && req.body.password && req.body.submit) {
        var userData = {
            username: req.body.username,
            password: req.body.password
        }
        User.authenticate(userData.username, userData.password, function (err, result) {
            if (err){
                res.send(err);
            }
            //console.log(result.username);
            req.session.userId = result._id;
            req.session.userName = result.username;
            req.session.loggedIn = true;
            //res.send(req.session.userName);
            res.redirect('/chat');

        });
    }
});


module.exports = router;
