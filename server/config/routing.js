'use strict';

exports = module.exports =  function(routers, appRouter) {
    Object.keys(routers).forEach(function(key) {
        var router = routers[key];
        var prefix = (routers.prefix)? routers.prefix : "";
        var RouterModule = require(router.filePath);
        var module = new RouterModule();
        Object.keys(router.routes).forEach(function(key) {
            var route = router.routes[key];
            var method = route.method.toLowerCase();
            var property = route.target;
            var matcher = prefix + route.matcher;
            appRouter[method](matcher, module[property]);
        });
    });
};