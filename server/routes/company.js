'use strict';

var express = require('express'),
  companyController = require('../controllers/company'),
  router = express.Router();

router.get('/', companyController.find);
router.get('/:companyName', companyController.findOrders);

module.exports = router;