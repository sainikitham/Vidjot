const express = require('express');
const app = express();
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req,res) => {
    const title = 'welcome to the world!'
    res.render('index', {
        title: title
    });
});
app.get('/about', (req, res) => {
  res.render('about');
});
const port = 5000;
app.listen(port, () => {
   console.log(`server started on ${port}`);
});
