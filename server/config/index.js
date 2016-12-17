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
        userRoles: ['user', 'admin', 'root'],
        ip: '0.0.0.0',
        env: process.env.NODE_ENV || 'dev',
        port: process.env.PORT || 9000,
        sslPort: process.env.PORT || 9443,
        create: function(db) {
            var koa = require('./koa');
            var app = koa(this);
            app.root = this.root;
            app.env = this.env;
            return app.create(db);
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
    },
    wiring : {
        create: function(application) {
            var wiring = require('./wiring');
            return wiring(this, application);
        },
        autowire : {
            services : "services"
        }
    }
};
var env = require('./env/' + common.app.env + '.js') || {};
var self =  _.merge(common, env);
module.exports = self;
