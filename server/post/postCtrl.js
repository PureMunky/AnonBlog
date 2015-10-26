'use strict';

var postModel = require('./postModel.js'),
  moment = require('moment'),
  PROMOTE_TIME_HOURS = 4;

// Processes and save a todo to the database.
function _save(post, cb) {
  if (post._id) {
    postModel.findOneAndUpdate({ _id: post._id }, post, { upsert: true }, cb);
  } else {
    postModel.create(post, cb);
  }
}

// Promotes a post.
function _promote(postId, cb) {
  postModel.findOne({ _id: postId }, function (err, dbPost) {
    var dbPromotedDate = moment(dbPost.Promoted);
    
    if (dbPromotedDate.add(PROMOTE_TIME_HOURS, 'hours').diff(moment()) < 0) {
      dbPost.Promoted = new Date();

      dbPost.save(cb);
    } else {
      cb(new Error('Cannot promote right now'));
    }
  });
}

// Gets the comments for a specific post.
function _getComments(postId, cb) {
  postModel.find({ Parent: postId }, cb);
}

module.exports.save = _save;
module.exports.promote = _promote;
module.exports.getComments = _getComments;