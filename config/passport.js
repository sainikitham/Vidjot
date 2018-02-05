var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
require('../models/Users');
const User = mongoose.model('users');
var bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({usernameField:'email'},(email, password,done) => {
    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'No user found' });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err){
              throw err;
          }
          if(isMatch){
            return done(null, user);
          }else{
            return done(null, false, { message: 'Incorrect password.' });
          }
        });
      });
}));
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });