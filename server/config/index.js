'use strict';

var _ = require('lodash');
var path = require('path');
var root = path.normalize(__dirname + '/../');

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
        build: function(application) {
            var locatorFactory = require('./locatorFactory');
            //console.log(this.config)
            return locatorFactory(this.config, application);
        },
        get config() {
            var InjectorParser = new require(path.normalize(__dirname + "/congaAnnotations/injector/InjectorParser"));
            var injectorParser = new InjectorParser();
            return injectorParser.parseComponents(root, this.scan);
        },
        scan : ["services/**/*.js"]
    },
    routing : {
        build: function(application) {
            var routing = require('./routing');
            return routing(this.config, application);
        },
        get config() {
            var RouterParser = new require(path.normalize(__dirname + "/congaAnnotations/router/RouterParser"));
            var routerParser = new RouterParser();
            return routerParser.parseComponents(root, this.scan);
        },
        scan : ["services/**/*.js"]
    }
};
var env = require('./env/' + common.env + '.js') || {};
var config =  _.merge(common, env);
module.exports = config;
