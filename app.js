const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')
const ideas = require('./routes/ideas');
const users = require('./routes/users');
const passport = require('passport');
const db = require('./config/database');
require('./models/Idea');

require('./config/passport');

mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

const Idea = mongoose.model('ideas');

app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
app.get('/', (req, res) => {
  const title = 'Welcome to the Vidjot!'
  res.render('index', {
    title: title
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.use('/users', users);
app.use('/ideas', ideas);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
