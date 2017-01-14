var locator = require('service-locator')();
var app = function (config) {
    var application, db, startSSL = true;
    return {
        create : create,
        startServer : startServer,
        serverShutdown: serverShutdown
    };
//---------------------------------
    function create() {
        application = config.app.create();
        application.db = db = config.db.create();
        application.root = config.root;
        application.env = config.env;
        application.locator = config.wiring.build(application);
        config.routing.build(application);
        return this;
    }

    function startServer() {
        application.startServer(startSSL);
        db.start();
        process
            .on('SIGINT', serverShutdown)
            .on('SIGTERM', serverShutdown);
        return application;
    }

    function serverShutdown() {
        db.shutdown(function() {
            application.serverShutdown();
            process.exit(0);
        });
    };
};
module.exports = app;



