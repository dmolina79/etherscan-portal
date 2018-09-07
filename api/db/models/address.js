/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const TransactionSchema = require('./transaction');

const { Schema } = mongoose;

const AddressSchema = new Schema({
  address: {
    type: String,
    required: [true, 'An address is required'],
    unique: true
  },
  balance: {
    type: Number,
  },
  balanceInWei: {
    type: Number,
  },
  transactions: [TransactionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

AddressSchema.plugin(uniqueValidator);

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;
