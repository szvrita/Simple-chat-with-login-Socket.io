var express = require('express');
var router = express.Router();
var User = require('../models/userSchema.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  User.find({username: req.session.userName})
        .then(function(users) {
            //var user = JSON.parse(users);
            console.log(users);
            var userName = users[0].username;
            //console.log(userName);


  res.render('chat', { name: userName });

});

});

module.exports = router;
