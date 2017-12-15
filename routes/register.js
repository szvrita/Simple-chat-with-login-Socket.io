var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/userSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.post('/', function (req, res, next) {
    if (req.body.username && req.body.password && req.body.submit) {
        if (!req.body.passwordconf) {
            req.body.passwordconf = req.body.password;
        }
        var userData = {
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordconf
        };
        if (userData.password === userData.passwordConf) {
            User.create(userData, function (err, user) {
                if (err) {
                    console.log(err);
                    //return next(err);
                } else {
                    req.session.userId = user._id;
                    req.session.loggedIn = true;
                    return res.redirect('/login');
                }
            });
        }
    }
});

module.exports = router;
