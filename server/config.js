'use strict';

var config = {
    db: {
        conn: process.env.MONGODB_URL || 'mongodb://localhost/AnonBlog'
    },
    web: {
        port: process.env.PORT,
        ip: process.env.IP
    }
};

module.exports = config;