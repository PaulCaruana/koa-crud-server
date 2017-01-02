var locator = require('servicelocator');
var app = function (config) {
    var application, db, startSSL = true;

    function startServer() {
        application = config.app.create().startServer(startSSL);
        application.db = config.db.create().start();
        application.root = config.root;
        application.env = config.env;
        application.locator = locator;

        config.wiring.build(application);
        config.routing.build(application);

        process
            .on('SIGINT', serverShutdown)
            .on('SIGTERM', serverShutdown);
    }

    function serverShutdown() {
        application.db.shutdown(function() {
            process.exit(0);
        });
    };
    return {
        startServer : startServer
    }
};
module.exports = app;



