'use strict';

function _resolve (res, next) {
  return function (err, post) {
    if (err) {
      res.json({
        success: false,
        message: 'Server Error',
        error: {}
      });
    } else {
      res.json({
        success: true,
        message: '',
        data: post
      });
    }
  }
}

module.exports.resolve = _resolve; 