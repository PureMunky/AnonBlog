'use strict';

var express = require('express');
var router = express.Router();
var postCtrl = require('./postCtrl.js');
var rh = require('../routeHelper.js');

router.get('/', function (req, res, next) {
  postCtrl.getAll(rh.resolve(res, next));
});

router.get('/:id', function (req, res, next) {
  postCtrl.get(req.params.id, rh.resolve(res, next));
});

router.get('/:id/comments', function (req, res, next) {
  postCtrl.getComments(req.params.id, rh.resolve(res, next));
});

router.put('/:id', function (req, res, next) {
  postCtrl.save(req.body, rh.resolve(res, next));
});

router.post('/', function (req, res, next) {
  postCtrl.save(req.body, rh.resolve(res, next));
});

router.get('/:id/promote', function (req, res, next) {
  postCtrl.getPromoteTime(req.params.id, rh.resolve(res, next));
});

router.post('/:id/promote', function (req, res, next) {
  postCtrl.promote(req.params.id, rh.resolve(res, next));
});

module.exports = router;