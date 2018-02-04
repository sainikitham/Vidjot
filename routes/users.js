const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
require('../models/Idea');
const Idea = mongoose.model('ideas');
require('../models/Users');
const User = mongoose.model('users');
var bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.render('users/login');
  });
  router.get('/register', (req, res) => {
      res.render('users/register');
    });
    router.post('/register', (req, res) => {
        var errors = [];
        if(req.body.password != req.body.password2){
            errors.push({text: 'passwords do not match'});
        }
        if(req.body.password.length < 4){
            errors.push({text: 'passwords length should be atleast 4 characters'});
        }
        if(errors.length > 0){
         res.render('users/register',{
             errors: errors,
             name: req.body.name,
             email:req.body.email,
             password:req.body.password,
             password2: req.body.password2
         })
        }else{
            User.findOne({email:req.body.email})
                .then(user => {
                    if(user){
                        req.flash('error_msg',"email already exists");
                        res.redirect('/users/register');
                    }
                    else{
                        var newUser = new User({
                            name:req.body.name,
                            email:req.body.email,
                            password:req.body.password
                        });            
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(newUser.password, salt, function(err, hash) {
                                if(err){
                                    console.log(err);
                                }
                                newUser.password = hash;
                                newUser.save().then(user => {
                                    req.flash('success_msg',"you are now registerd and can login!");
                                    res.redirect('/users/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                            });
                        });  
                    }                  
                });                  
        }
    });
module.exports = router;