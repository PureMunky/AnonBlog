'use strict';

var express = require('express');
var router = express.Router();
var post = require('./postModel.js');
var postCtrl = require('./postCtrl.js');
var rh = require('../routeHelper.js');
var user = require('../user/userCtrl.js');

router.get('/', function (req, res, next) {
  post.find({ _owner: userId }, rh.resolve(res, next));
});

router.get('/:id', function (req, res, next) {
  if (req.params.id == -1) {
    rh.resolve(res, next)(null, new post({
      Title: '',
      RepeatFormula: '',
      Tags: [],
      Contexts: [],
      Description: ''
    }));
  } else {
    todo.findOne({ _id: req.params.id }).exec(rh.resolve(res, next));
  }
});

router.put('/:id', function (req, res, next) {
    todoCtrl.save(req.body, rh.resolve(res, next));
});

router.post('/', function (req, res, next) {
    todoCtrl.save(req.body, rh.resolve(res, next));
});

module.exports = router;