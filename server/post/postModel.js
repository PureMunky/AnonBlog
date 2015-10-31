'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PostSchema = new Schema({
  Title: String,
  CreateDate: { type: Date, default: new Date() },
  Body: String,
  Promoted: { type: Date, default: null },
  Parent: Schema.Types.ObjectId
});

module.exports = mongoose.model('Post', PostSchema);