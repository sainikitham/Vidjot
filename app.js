const express = require('express');
const app = express();
app.get('/', (req,res) => {
    res.send('hello');
});
app.get('/about', (req, res) => {
  res.send('about');
});
const port = 5000;
app.listen(port, () => {
   console.log(`server started on ${port}`);
});
