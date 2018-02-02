const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/Idea');
const Idea = mongoose.model('ideas');

router.get('/', (req, res) => {
    Idea.find({})
    .then((ideas) => {
        res.render('ideas/index',{
            ideas: ideas
        });
    });
    
  });
router.get('/add', (req, res) => {
    res.render('ideas/add');
});

router.post('/', (req, res) => {
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
       res.render('ideas/add',{
           errors: errors,
           title: req.body.title,
           details: req.body.details
       });
    }
    else{
        const kitty = new Idea({ title: req.body.title, details: req.body.details});
        kitty.save().then(() => {
            req.flash('success_msg', 'Video Idea added');
            res.redirect('ideas');
        });
    }
});
router.get('/edit/:id',(req, res) => {
    Idea.findOne({
      _id: req.params.id
    }).then((idea) => {
        res.render('ideas/edit',{
            idea: idea
        });
    });    
});
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    Idea.remove({_id: req.params.id}).then(() => {
        req.flash('success_msg', 'Video Idea removed');
        res.redirect('ideas')
    });
});

module.exports = router;