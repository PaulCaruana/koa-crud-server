var http = require('http');
var koa = require('koa');
var serve = require('koa-static');
var logger = require('koa-logger');
var app = module.exports = koa();
var path = require('path');
var config;

app.server = function (config) {
    var server, db;
    create();
    return {
        start: start,
        shutdown : shutdown
    };

    //----------------------
    function create() {
        server = http.createServer(app.callback());
        db = config.db.create();
        db.start();

        app.use(logger());
        app.use(serve(path.join(__dirname, '/public')));
        app.use(function *() {
            this.body = "Hello World";
        });
    };

    function start() {
        server.listen(config.port, config.ip, function () {
            console.log('materialApp started server on ip %s on port %d, in %s mode',
                config.ip, config.port, config.env);
        });
        process
            .on('SIGINT', this.shutdown)
            .on('SIGTERM', this.shutdown);

    };

    function shutdown() {
        db.shutdown(function() {
            process.exit(0);
        });
    };
};



