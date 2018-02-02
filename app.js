const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
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

app.use(methodOverride('_method'));

app.get('/', (req,res) => {
    const title = 'welcome to the Vidjot!'
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
app.put('/ideas/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {        
        idea.title = req.body.title;
        idea.details = req.body.details;    
        idea.save().then(() => {
            res.redirect('/ideas')
        });     
    });
      
  });
app.delete('/ideas/:id', (req, res) => {
    Idea.remove({_id: req.params.id}).then(() => {
        res.redirect('/ideas')
    });
});
const port = 5000;
app.listen(port, () => {
   console.log(`server started on ${port}`);
});
