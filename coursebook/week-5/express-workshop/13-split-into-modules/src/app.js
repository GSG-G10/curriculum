const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const compression = require('compression');

const app = express();

app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  express.static(path.join(__dirname, '..', 'public'), { maxAge: '30d' })
);

app.get('/fruit', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'fruit.html'));
});

app.post('/fruit', (req, res) => {
  console.log(req.body.name, req.body.image_url);
  res.redirect('/fruit');
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'public', '404.html'));
});

app.use((err, req, res, next) => {
  res.status(500).sendFile(path.join(__dirname, '..', 'public', '500.html'));
});

app.listen(app.get('port'), () => {
  console.log('App running on port', app.get('port'));
});
