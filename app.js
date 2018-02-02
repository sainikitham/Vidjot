const express = require('express');
const app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('./models/Idea');

mongoose.Promise = global.Promise;  
mongoose.connect('mongodb://localhost/vidjot-dev')
.then(() => console.log("mongodb connected"))
.catch((err) => console.log(err));

const Idea = mongoose.model('ideas');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    const title = 'welcome to the world!'
    res.render('index', {
        title: title
    });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/ideas', (req, res) => {
    Idea.find({})
    .then((ideas) => {
        res.render('ideas/index',{
            ideas: ideas
        });
    });
    
  });
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});
app.post('/ideas', (req, res) => {
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
        kitty.save().then(() => res.redirect('ideas'));
    }
});
app.get('/ideas/edit/:id',(req, res) => {
    Idea.findOne({
      _id: req.params.id
    }).then((idea) => {
        res.render('ideas/edit',{
            idea: idea
        });
    });
    
});
const port = 5000;
app.listen(port, () => {
   console.log(`server started on ${port}`);
});
