'use strict';

var express = require('express'),
  orderController = require('../controllers/order'),
  router = express.Router();

router.get('/', orderController.find);
router.get('/from/:address', orderController.findByAddress);
router.get('/addresses', orderController.findAddresses);
router.get('/:id', orderController.findOne);
router.post('/', orderController.create);
router.put('/:id', orderController.update);
router.patch('/:id', orderController.update);
router.delete('/:id', orderController.remove);

module.exports = router;