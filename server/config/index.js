'use strict';

var _ = require('lodash');
var path = require('path');

/**
 * Load environment configuration
 */
var common = {
    shared : {
    },
    app : {
        root: path.normalize(__dirname + '/../..'),
        publicDir: '/public',
        // List of user roles
        userRoles: ['user', 'admin', 'root'],
        ip: '0.0.0.0',
        env: process.env.NODE_ENV || 'dev',
        port: process.env.PORT || 9000,
        sslPort: process.env.PORT || 9443,
        create: function() {
            var koa = require('./koa');
            var app = koa(this);
            return app.create();
        }
    },
    db : {
        create: function() {
            var orm = require('./mongoose');
            return orm(this);
        },
        mongo: {
            options: {
                db: {
                    safe: true
                },
                server: {
                    socketOptions: {
                        keepAlive: 1,
                        connectTimeoutMS: 10000
                    }
                },
                replset: {
                    socketOptions: {
                        keepAlive: 1,
                        connectTimeoutMS: 10000
                    }
                }
            }
        }
    }
};
var env = require('./env/' + common.app.env + '.js') || {};
module.exports =  _.merge(common, env);
