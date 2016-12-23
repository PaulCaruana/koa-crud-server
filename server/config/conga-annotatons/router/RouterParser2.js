var path = require('path');
var annotations = require('conga-annotations');
var fs = require('fs');

// create the registry
var registry = new annotations.Registry();

var RouteParser = function (dir) {
// add annotations to the registry
    registry.registerAnnotation(path.join(__dirname, 'router'));
    registry.registerAnnotation(path.join(__dirname, 'route'));

// create the annotation reader
    var GeneratorReader = require('../GeneratorReader');
    var reader = new GeneratorReader(registry);
    console.log(parseModules(dir) )

    function parseModules(dir) {
        var routers = {};
        var files = fs.readdirSync(dir)
        console.log(files)
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var filePath = path.join(dir, file)
            var router = parseModule(filePath);
            if (router.target) {
                var target = router.target;
                routers[target] = router;
            }
        }
        return routers;
    };

    function parseModule(filePath) {
        reader.parse(filePath);
        var routerAnnotations = reader.getConstructorAnnotations();
        var router;
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
