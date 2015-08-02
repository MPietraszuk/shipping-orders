'use strict';

var
  _ = require('lodash'),
  Q = require('q'),
  db = require('./db')(),
  orderRepository = require('./repositories/order'),
  sampleData = [{
    orderId: 1,
    companyName: 'SuperTrader',
    customerAddress: 'Steindamm 80',
    orderedItem: 'Macbook'
  }, {
    orderId: 2,
    companyName: 'Cheapskates',
    customerAddress: 'Reeperbahn 153',
    orderedItem: 'Macbook'
  }, {
    orderId: 3,
    companyName: 'MegaCorp',
    customerAddress: 'Steindamm 80',
    orderedItem: 'Book "Guide to Hamburg"'
  }, {
    orderId: 4,
    companyName: 'SuperTrader',
    customerAddress: 'Sternstrasse 125',
    orderedItem: 'Book "Cooking 101"'
  }, {
    orderId: 5,
    companyName: 'SuperTrader',
    customerAddress: 'Ottenser Hauptstrasse 24',
    orderedItem: 'Inline Skates'
  }, {
    orderId: 6,
    companyName: 'MegaCorp',
    customerAddress: 'Reeperbahn 153',
    orderedItem: 'Playstation'
  }, {
    orderId: 7,
    companyName: 'Cheapskates',
    customerAddress: 'Lagerstrasse 11',
    orderedItem: 'Flux compensator'
  }, {
    orderId: 8,
    companyName: 'SuperTrader',
    customerAddress: 'Reeperbahn 153',
    orderedItem: 'Inline Skates'
  }];



Q.fcall(orderRepository.drop)
  .then(function () {
    console.log('collection removed!');
    return _.map(sampleData, function (order) {
      return orderRepository.create(order);
    });
  })
  .then(Q.all)
  .then(function () {
    console.log('Sample data has been saved successfully!');
    process.exit();
  });