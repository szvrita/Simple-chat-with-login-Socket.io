var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    }
});
// Hashing of password before saveing
UserSchema.pre('save', function (next) {
    var thingthatishappening = this;
    bcrypt.hash(thingthatishappening.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        thingthatishappening.password = hash;
        thingthatishappening.passwordConf = hash;
        next();
    });
});

// Authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({'username': {$regex: new RegExp('^' + username, 'i')}}).exec(function (err, user) {
      //console.log(username);
        if (err) {
            return callback(err);
        }else if (!user){
            var err = new Error('No user found.');
            err.message = "No user '" + username + "' found.";
            return callback(err);

        }
        bcrypt.compare(password, user.password, function (err, result) {
              if (result === true){
                return callback(null, user);

            } else{
                var error = new Error('Password do not match');
                err.status = 401;
                return callback(err);
            }

        });
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
