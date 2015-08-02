'use strict';

var
  Exception = require('../utils/exception'),
  orderRepository = require('../repositories/order'),
  orderController = {};

orderController.find = function (req, res) {
  orderRepository
    .find()
    .then(function (orders) {
      res.status(200).json(orders);
    })
    .catch(Exception.errorResponse(res));
};

orderController.findByAddress = function (req, res) {
  orderRepository
    .findByAddress(req.params.address)
    .then(function (orders) {
      res.status(200).json(orders);
    })
    .catch(Exception.errorResponse(res));
};

orderController.findAddresses = function (req, res) {
  orderRepository
    .findAddresses()
    .then(function (addresses) {
      res.status(200).json(addresses);
    })
    .catch(Exception.errorResponse(res));
};

orderController.findOne = function (req, res) {
  orderRepository
    .show(req.params.id)
    .then(function (order) {
      res.json(order);
    })
    .catch(Exception.errorResponse(res));
};

orderController.create = function (req, res) {
  orderRepository
    .create(req.body)
    .then(function (order) {
      res.status(201).json(order);
    })
    .catch(Exception.errorResponse(res));
};

orderController.update = function (req, res) {
  orderRepository
    .update(req.params.id, req.body)
    .then(function (order) {
      res.status(200).json(order);
    })
    .catch(Exception.errorResponse(res));
};

orderController.remove = function (req, res) {
  orderRepository
    .remove(req.params.id)
    .then(function () {
      res.status(204).send('No data');
    })
    .catch(Exception.errorResponse(res));
};

module.exports = orderController;