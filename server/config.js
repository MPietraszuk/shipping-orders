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
    // This app still has no build workflow but at the end everything gets build and goes into public folder
    console.warn('NOTE: The proper build workflow is not implemeneted yet');

    app.use(favicon(path.join(root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(root, 'public')));
    app.set('appPath', path.join(root, 'public'));
    app.use(morgan('dev'));
  } else {
    app.use(express.static(path.join(root, '.tmp')));
    app.use(express.static(path.join(root, 'client')));
    app.set('appPath', path.join(root, 'client'));
    app.use(morgan('dev'));
    app.use(errorHandler()); // This has to be last item
  }
};