'use strict';

var config = {};

config['PRIMARY'] = {};
config['PRIMARY'].db = {};
config['PRIMARY'].db.conn = 'mongodb://localhost/AnonBlog';

config['TEST'] = {};
config['TEST'].db = {};
config['TEST'].db.conn = 'mongodb://localhost/AnonBlogTest';

module.exports = config;