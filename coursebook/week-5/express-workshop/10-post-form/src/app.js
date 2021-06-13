const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

// parse incoming json using express.json()

// parse urlencoded application/x-www-form-urlencoded bodies express.urlencoded({ extended: false }) 

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/fruit', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'fruit.html'));
});

// create a post '/fruit' handler and log 'name' and 'image_url'
// redirect to '/fruit'

app.listen(3000, () => {
  console.log('App running on port 3000');
});
