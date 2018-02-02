const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')
const ideas = require('./routes/ideas');
const users = require('./routes/users');

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


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
app.use(flash());
app.use(function(req, res, next){
  res.locals.success_msg =  req.flash('success_msg');
  res.locals.error_msg =  req.flash('error_msg');
  res.locals.error =  req.flash('error');
  next();
});
app.get('/', (req,res) => {
    const title = 'welcome to the Vidjot!'
    res.render('index', {
        title: title
    });
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.use('/users',users);
app.use('/ideas',ideas);
const port = 5000;
app.listen(port, () => {
   console.log(`server started on ${port}`);
});
