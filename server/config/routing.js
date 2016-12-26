'use strict';

exports = module.exports =  function(annotation, application) {
    var appRouter = application.router;
    var routers = annotation.parser(application.root, annotation.scan);
    Object.keys(routers).forEach(function(key) {
        var router = routers[key];
        var Target = require(router.filePath);
        var target  = new Target();
        router.routes.forEach(function(route) {
            var method = route.method.toLowerCase();
            var property = route.target;
            var matcher = route.matcher;
            appRouter[method](matcher, target[property]);
        });

    });
};