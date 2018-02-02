const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/Idea');
const Idea = mongoose.model('ideas');

router.get('/login', (req, res) => {
    res.send('login');
  });
  router.get('/register', (req, res) => {
      res.send('register');
    });
module.exports = router;