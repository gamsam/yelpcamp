var mongoose                = require('mongoose');
var passportLocalMongoose   = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
// Compile model from schema
module.exports = mongoose.model('User', UserSchema );