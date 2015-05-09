'use strict';

var postModel = require('../server/post/postModel.js'),
  postCtrl = require('../server/post/postCtrl.js'),
  mongoose = require('mongoose'),
  moment = require('moment'),
  config = require('../server/config.js')['TEST'];



describe('postCtrl.js', function () {

  beforeEach(function (done) {

    function connect() {
      mongoose.connect(config.db.conn, cleanPosts);
    }

    function cleanPosts() {
      postModel.remove({}, false).exec(function () {
        done();
      });
    }

    connect();
  });

  afterEach(function () {
    mongoose.connection.close();
  });

  it('works', function () {
    expect(1).toBe(1);
  });

  it('gets todos', function (done) {
    postModel.create({ id: 123, Title: 'test title', Body: 'test body'}, function (err, data) {
      postModel.find({ Title: 'test title' }, function (err, tasks) {
        expect(tasks.length).toBeGreaterThan(0);
        done();
      });
    });
  });

  it('has a valid model', function (done) {
    var source = {
      Title: 'test title',
      CreateDate: new Date(),
      Body: 'test body',
      Promoted: new Date()
    };

    postModel.create(source, function (err) {
      expect(err).toBe(null);
      postModel.findOne({ Title: source.Title }, function (err, data) {
        expect(err).toBe(null);

        expect(data).toBeDefined();
        expect(data.Title).toBe(source.Title);

        done();
      });

    });
  });

  it('saves models', function (done) {
    var source = {
      Title: 'test title',
      CreateDate: new Date(),
      Body: 'test body',
      Promoted: new Date()
    };

    postCtrl.save(source, function (err, data) {
      expect(err).toBe(null);
      expect(data._id).toBeDefined();
      done();
    });

  });

});