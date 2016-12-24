var path = require('path');
var annotations = require('conga-annotations');
var fs = require('fs');
var glob = require('glob-fs')({ gitignore: true });

// create the registry
var registry = new annotations.Registry();

var RouteParser = function (root, libs) {
// add annotations to the registry
    registry.registerAnnotation(path.join(__dirname, 'router'));
    registry.registerAnnotation(path.join(__dirname, 'route'));

// create the annotation reader
    var GeneratorReader = require('../GeneratorReader');
    var routers = {};
    libs.forEach(function(lib) {
        parseModules(lib);
    });
    return routers

    //console.log(parseModules(dir) )

    function parseModules(lib) {
        var files = glob.readdirSync(lib)
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var filePath = path.join(root, file)
            //console.log(file)
            var router = parseModule(filePath);
            //console.log(router);
            if (router.target) {
                var target = router.target;
                routers[target] = router;
            }
        }
    };

    function parseModule(filePath) {
        var reader = new GeneratorReader(registry);
        reader.parse(filePath);
        var routerAnnotations = reader.getConstructorAnnotations();
        var router = {};
        routerAnnotations.forEach(function (routerAnnotation) {
            router = {
                filePath: routerAnnotation.filePath,
                options: routerAnnotation.options,
                target: routerAnnotation.target,
                routes: []
            };
        });
        var methodAnnotations = reader.getMethodAnnotations();
        methodAnnotations.forEach(function (methodAnnotation) {
            var route = {
                matcher: methodAnnotation.value,
                method: methodAnnotation.method,
                target: methodAnnotation.target
            };
            router.filePath = methodAnnotation.filePath;
            router.routes.push(route);
        });
        return router;
    }

// parse the annotations from a file
};
module.exports = RouteParser;
