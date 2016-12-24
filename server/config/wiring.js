'use strict';

var wiring = function(config, wiring, app) {
    var router = wiring.router;
    var appRouter = app.router;
    var routers = router.loader(config.root, router.libs);
    Object.keys(routers).forEach(function(key) {
        var router = routers[key];
        var Target = require(router.filePath);
        var instance  = new Target();
        router.routes.forEach(function(route) {
            var method = route.method.toLowerCase();
            var property = route.target;
            var matcher = route.matcher;
            appRouter[method](matcher, instance[property]);
        });

    });

    //console.log(routeList);
    //var servicesLocation = config.services;
    //require(config.services.location + "/" + config.services.user)(app.router);
};
exports = module.exports = wiring;