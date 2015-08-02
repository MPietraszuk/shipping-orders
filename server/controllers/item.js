'use strict';

var
  Exception = require('../utils/exception'),
  itemRepository = require('../repositories/item'),
  itemController = {};

itemController.find = function (req, res) {
  itemRepository
    .find()
    .then(function (items) {
      res.status(200).json(items);
    })
    .catch(Exception.errorResponse(res));
};

module.exports = itemController;