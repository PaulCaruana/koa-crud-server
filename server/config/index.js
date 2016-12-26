'use strict';

var _ = require('lodash');
var path = require('path');
var root = path.normalize(__dirname + '/../../');

/**
 * Load environment configuration
 */
var common = {
    root: root,
    userRoles: ['user', 'admin', 'root'],
    env: process.env.NODE_ENV || 'dev',
    app : {
        create: function(db) {
            var koa = require('./koa');
            this.server.env = config.env;
            this.server.root = config.root;
            var app = koa(this.server);
            return app.create(db);
        },
        server: {
            publicDir: '/public',
            ip: '0.0.0.0',
            port: process.env.PORT || 9000,
            sslPort: process.env.PORT || 9443
        }
    },
    db : {
        create: function() {
            var orm = require('./mongoose');
            return orm(this.mongo);
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
            return wiring(config, this, application);
        },
        autowire : {
            libs : ["server/services/**/*.js"]
        }
    },
    routing : {
        create: function(application) {
            var routing = require('./routing');
            return routing(this.annotation, application);
        },
        annotation : {
            parser : require(path.normalize(__dirname + "/congaAnnotations/router/RouterParser")),
            scan : ["server/services/**/*.js"]
        }
    }
};
var env = require('./env/' + common.env + '.js') || {};
var config =  _.merge(common, env);
module.exports = config;
