module.exports = function (app) {
  'use strict';

  var path = require('path'),
    itemController = require('../controllers/item');

  app
    .use('/api/orders', require('./order'));

  app
    .use('/api/companies', require('./company'));

  app
    .get('/api/items', itemController.find);

  app
    .route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(function pageNotFound(req, res) {
      res.status(404);
      res.render('404', function (err) {
        if (err) {
          return res.json({
            status: 404
          }, 404);
        }
        res.render('404');
      });
    });

  app
    .route('/*')
    .get(function (req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};