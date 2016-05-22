'use strict';

var postModel = require('./postModel.js'),
  moment = require('moment'),
  PROMOTE_TIME_SECONDS = 900, // 15 Minutes
  PROMOTE_TIME_MINUTES = PROMOTE_TIME_SECONDS / 60;

// Gets all posts.
function _getAll(cb) {
  postModel.find({ Parent: null }, cb);
}

// Gets the post for the passed id.
function _get(id, cb) {
  if (id == -1) {
    cb(null, new postModel({
      Title: '',
      Body: ''
    }));
  } else {
    postModel.findOne({ _id: id }).exec(cb);
  }
}

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
      dbPost.PromotedCount++;

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
    if (err) {
      cb(err);
    } else {
      var nextPromotedTime = _getTimeToNextPromote(dbPost.Promoted);
      console.log(moment(dbPost.CreateDate));
      console.log(moment());
      cb(null, {
        promotedCount: dbPost.PromotedCount,
        promoteTimeMinutes: PROMOTE_TIME_MINUTES,
        remainingTime: nextPromotedTime,
        promotedTime: ((dbPost.PromotedCount * PROMOTE_TIME_MINUTES * 60000) - nextPromotedTime),
        totalTime: moment().diff(moment(dbPost.CreateDate))
      });
    }
  });
}

// Get the next time a post can be promoted
function _getTimeToNextPromote(datetime) {
  var mDateTime = moment(datetime);
  return mDateTime.add(PROMOTE_TIME_MINUTES, 'minutes').diff(moment())
}

module.exports.getAll = _getAll;
module.exports.get = _get;
module.exports.save = _save;
module.exports.promote = _promote;
module.exports.getComments = _getComments;
module.exports.getPromoteTime = _getPromoteTime;