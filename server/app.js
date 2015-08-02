var express = require('express'),
  db = require('./db')(),
  config = require('./config'),
  routes = require('./routes'),
  app = express(),
  server = require('http').createServer(app),
  host = process.env.IP || 'localhost';

config(app);

routes(app);

server.listen(app.get('port'), host, function () {
  console.log('Express server listening on ' + app.get('port') + ' :[' + app.get('env') + ']');
});

exports = module.exports = app;