/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const TransactionSchema = new Schema({
  blockNumber: {
    type: Number,
  },
  timeStamp: {
    type: Number,
  },
  hash: {
    type: String,
  },
  nonce: {
    type: Number,
  },
  blockHash: {
    type: String,
  },
  transactionIndex: {
    type: Number,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  value: {
    type: Number,
  },
  gas: {
    type: Number,
  },
  gasPrice: {
    type: Number,
  },
  txreceipt_status: {
    type: Number,
  },
  input: {
    type: String,
  },
  contractAddress: {
    type: String,
  },
  cumulativeGasUsed: {
    type: Number,
  },
  gasUsed: {
    type: Number,
  },
  confirmations: {
    type: Number,
  },
});

module.exports = TransactionSchema;