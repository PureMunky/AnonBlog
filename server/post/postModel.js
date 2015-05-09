'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PostSchema = new Schema({
  Title: { type: String, required: true },
  CreateDate: Date,
  Body: String,
  Promoted: Date
});

module.exports = mongoose.model('Post', PostSchema);