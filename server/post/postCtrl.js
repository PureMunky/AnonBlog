'use strict';

var postModel = require('./postModel.js'),
  moment = require('moment'),
  PROMOTE_TIME_MINUTES = 15;

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
    if (_getTimeToNextPromote(dbPost.Promoted) < 0 || dbPost.Promoted == null) {
      dbPost.Promoted = new Date();

      dbPost.save();
      
      _getPromoteTime(postId, cb);
    } else {
      cb(new Error('Cannot promote right now'));
    }
  });
}

// Gets the comments for a specific post.
function _getComments(postId, cb) {
  postModel.find({ Parent: postId }, cb);
}

// Gets the remaining seconds for a post to be promoted again.
function _getPromoteTime(postId, cb) {
  postModel.findOne({ _id: postId}, function (err, dbPost) {
    var nextPromotedTime = _getTimeToNextPromote(dbPost.Promoted);
    
    if (nextPromotedTime > 0) {
      cb(null, {
        remainingTime: nextPromotedTime
      });
    } else {
      cb(null, {
        remainingTime: 0
      });
    }
  });
}

// Get the next time a post can be promoted
function _getTimeToNextPromote(datetime) {
  var mDateTime = moment(datetime);
  return mDateTime.add(PROMOTE_TIME_MINUTES, 'minutes').diff(moment())
}

module.exports.save = _save;
module.exports.promote = _promote;
module.exports.getComments = _getComments;
module.exports.getPromoteTime = _getPromoteTime;