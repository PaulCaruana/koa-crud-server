exports = module.exports = (function() {
    var application, db, startSSL = true;
    return {
        create : function(config) {
            application = config.app.create();
            application.db = db = config.db.create();
            application.root = config.root;
            application.env = config.env;
            application.locator = config.wiring.build(application);
            config.routing.build(application);
            return {
                startServer : _startServer,
                serverShutdown: _serverShutdown
            }
        }
    };
    //------------------------------------
    function _startServer() {
        application.startServer(startSSL);
        db.start();
        process
            .on('SIGINT', _serverShutdown)
            .on('SIGTERM', _serverShutdown);
        return application;
    }

    function _serverShutdown() {
        db.shutdown(function() {
            application.serverShutdown();
            process.exit(0);
        });
    };
})();