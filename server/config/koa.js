/**
 * Connect to the database and add connection handlers
 * @module {MongooseConnection} config:mongoose
 * @requires {@link config}
 */
'use strict';
var koa = require('koa');
var middlewares = require('koa-middlewares');
var path = require('path');
var http = require('http');
var router = middlewares.router();
var app = koa();
var https = require('https');
var fs = require('fs');
var serve = require('koa-static');


var application = function (config) {
    return {
        create : create,
        startServer : startServer,
        httpServer: null,
        httpsServer: null,
        serverShutdown: serverShutdown,
        router : router
    };
//---------------------------------
    function create() {
        app.use(middlewares.bodyParser());
        app.use(middlewares.conditional());
        app.use(middlewares.etag());
        app.use(middlewares.compress());
        app.use(middlewares.logger());
        app.use(middlewares.staticCache(path.join(config.root, 'public'), {
            buffer: true,
            maxAge:1
        }));
        middlewares.csrf(app);
        app.use(router.routes());
        app.use(router.allowedMethods());
        return this;
    }

    function startServer(ssl) {
        this.httpServer = http.createServer(app.callback());
        if (ssl) {
            var options = {
                key: fs.readFileSync(__dirname + '/auth/key.pem'),
                cert: fs.readFileSync(__dirname + '/auth/cert.pem')
            };
            this.httpsServer = https.createServer(options, app.callback());
        }

        this.httpServer.listen(config.port, config.ip, function () {
            console.log('Http server on ip %s on port %d, in %s mode',
                config.ip, config.port, config.env);
        });
        if (this.httpsServer){
            this.httpsServer.listen(config.sslPort, config.ip, function () {
                console.log('Https server on ip %s on port %d, in %s mode',
                    config.ip, config.sslPort, config.env);
            });
        }
        return this;
    }

    function serverShutdown(){}
};
exports = module.exports = application;