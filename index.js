var express = require('express'),
  post = require('./server/post/postRoute.js'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  config = require('./server/config.js');

var app = express();
app.use(bodyParser.json());
app.use('/post', post);
app.use(express.static(__dirname + '/app'));

// Server default.html when no page specified.
app.get('/', function (req, res) {
  res.sendFile('default.html', { root: __dirname + '/app' });
});

app.listen(config.web.port);
console.log('web server listening');

mongoose.connect(config.db.conn, function (err) {
  if (err) {
    console.log('db connection error', err);
  } else {
    console.log('db connection successful');
  }
});