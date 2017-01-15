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
                startServer: _startServer,
                serverShutdown: _serverShutdown,
                startDB: _startDB,
                dbShutdown: _dbShutdown,
                server: application.server

            }
        }
    };
    //------------------------------------
    function _startServer() {
        application.startServer(startSSL);
        db.start();
        process
            .on('SIGINT', this.serverShutdown)
            .on('SIGTERM', this.serverShutdown);
        return application;
    }

    function _startDB() {
        db.start();
        return application;
    }

    function _dbShutdown() {
        db.shutdown(function() {
            process.exit(0);
        });
    };

    function _serverShutdown() {
        db.shutdown(function() {
            application.serverShutdown();
            process.exit(0);
        });
    };
})();