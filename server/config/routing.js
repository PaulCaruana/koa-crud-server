exports = module.exports = function (routers, application) {
    var locator = application.locator;
    var appRouter = application.router;

    Object.keys(routers).forEach(function (key) {
        var router = routers[key];
        var prefix = (router.prefix) ? router.prefix : "";
        var id = router.id;
        var module = locator.get(id);
        Object.keys(router.routes).forEach(function (key) {
            var route = router.routes[key];
            var method = route.method.toLowerCase();
            var property = route.target;
            var matcher = prefix + route.matcher;
            appRouter[method](matcher, module[property]);
        });
    });
};