module.exports = function (app) {
  'use strict';

  var express = require('express'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    env = process.env.NODE_ENV || 'development',
    root = __dirname + '/..';

  app.set('port', (process.env.PORT || 3000));
  app.set('env', env);

  app.set('views', root + '/public');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  if ('production' === env) {
    app.use(favicon(path.join(root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(root, 'public')));
    app.set('appPath', path.join(root, 'public'));
    app.use(morgan('dev'));
  } else {
    app.use(express.static(path.join(root, '.tmp')));
    app.use(express.static(path.join(root, 'client')));
    app.use('/bower_components',  express.static(__dirname + '/../bower_components'));
    app.set('appPath', path.join(root, 'client'));
    app.use(morgan('dev'));
    app.use(errorHandler());
  }
};