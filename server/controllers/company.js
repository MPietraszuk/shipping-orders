'use strict';

var
  Exception = require('../utils/exception'),
  companyRepository = require('../repositories/company'),
  companyController = {};

companyController.find = function (req, res) {
  companyRepository
    .find()
    .then(function (companies) {
      res.status(200).json(companies);
    })
    .catch(Exception.errorResponse(res));
};

companyController.findOrders = function (req, res) {
  companyRepository
    .findOrders(req.params.companyName)
    .then(function (orders) {
      res.status(200).json(orders);
    })
    .catch(Exception.errorResponse(res));
};

module.exports = companyController;