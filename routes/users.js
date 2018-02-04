const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/Idea');
const Idea = mongoose.model('ideas');

router.get('/login', (req, res) => {
    res.render('users/login');
  });
  router.get('/register', (req, res) => {
      res.render('users/register');
    });
    router.post('/register', (req, res) => {
        var errors = [];
        if(req.body.password != req.body.password2){
            errors.push({text: 'passwords do n0t match'});
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
            res.send('register');            
        }
    });
module.exports = router;