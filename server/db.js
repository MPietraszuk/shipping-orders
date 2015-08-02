module.exports = function () {
  'use strict';
  var
    mongoose = require('mongoose'),
    uri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
    'mongodb://localhost/shipping-orders';

  mongoose.connect(uri, {
    db: {
      safe: true
    }
  });

  mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  });
};