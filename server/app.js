var app = function (config) {
    var config, application, router, server, db;
    create();
    return {
        create : create,
        start: start,
        shutdown : shutdown
    };

    //----------------------
    function create() {
        application = config.app.create();
        router = application.router;
        router
            .get('/', function *(next) {
                this.body = 'Hello World!';
            });
        server = application.createServer(true);
        db = config.db.create();
        return this;
    }

    function start() {
        application.startServer();
        db.start();
        process
            .on('SIGINT', this.shutdown)
            .on('SIGTERM', this.shutdown);
    }

    function shutdown() {
        db.shutdown(function() {
            process.exit(0);
        });
    };
};
module.exports = app;



