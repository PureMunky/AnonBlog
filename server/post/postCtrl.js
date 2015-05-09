'use strict';

var postModel = require('./postModel.js');

// Processes and save a todo to the database.
function _save(post, cb) {
  postModel.update({ _id: post._id }, post, { upsert: true }, function (err, newPost) {
    if (err) { cb(err); }
    postModel.findOne({ _id: newPost.id }, cb);
  });
}

module.exports.save = _save;