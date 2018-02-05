const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/Idea');
const Idea = mongoose.model('ideas');
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/',ensureAuthenticated, (req, res) => {
    Idea.find({user: req.user.id})
    .then((ideas) => {
        res.render('ideas/index',{
            ideas: ideas
        });
    });
    
  });
router.get('/add',ensureAuthenticated, (req, res) => {
    res.render('ideas/add');
});

router.post('/',ensureAuthenticated, (req, res) => {
    let errors = [];
    if(!req.body.title){
        errors.push({
            text:"please add the title!"
        });
    }
    if(!req.body.details){
        errors.push({
            text:"please add the details!"
        });
    }
    if(errors.length > 0){
       res.render('/add',{
           errors: errors,
           title: req.body.title,
           details: req.body.details
       });
    }
    else{
        const kitty = new Idea({ title: req.body.title, user: req.user.id, details: req.body.details});
        kitty.save().then(() => {
            req.flash('success_msg', 'Video Idea added');
            res.redirect('ideas');
        });
    }
});
router.get('/edit/:id',ensureAuthenticated,(req, res) => {
    Idea.findOne({
      _id: req.params.id
    }).then((idea) => {
        if(idea.user != req.user.id){
            req.flash('error_msg',"not authorized");
            res.redirect('/ideas')
        }else{
            res.render('ideas/edit',{
                idea: idea
            });
        }
        
    });    
});
router.put('/:id',ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {        
        idea.title = req.body.title;
        idea.details = req.body.details;    
        idea.save().then(() => {
            req.flash('success_msg', 'Video Idea updated');
            res.redirect('ideas')
        });     
    });
      
  });
router.delete('/:id',ensureAuthenticated, (req, res) => {
    Idea.remove({_id: req.params.id}).then(() => {
        req.flash('success_msg', 'Video Idea removed');
        res.redirect('ideas')
    });
});

module.exports = router;