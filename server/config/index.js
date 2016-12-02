'use strict';

var _ = require('lodash');
var path = require('path');

/**
 * Load environment configuration
 */

var common = {
    env: process.env.NODE_ENV,

    root: path.normalize(__dirname + '/../..'),

    publicDir: 'client',

    ip: '0.0.0.0',

    port: process.env.PORT || 9001,

    // List of user roles
    userRoles: ['user', 'admin', 'root'],


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

module.exports = _.merge(
    common,
    require('./env/' + process.env.NODE_ENV + '.js') || {});
