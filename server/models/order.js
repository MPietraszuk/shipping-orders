'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OrderSchema = new Schema({
  orderId: Number,
  companyName: String,
  customerAddress: String,
  orderedItem: String
});

module.exports = mongoose.model('Order', OrderSchema);