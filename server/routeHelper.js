'use strict';

var user = require('./user/userCtrl.js');

function _resolve (res, next) {
  return function (err, post) {
    if (err) return next(err);
    res.json(post);
  }
}

module.exports.resolve = _resolve; 