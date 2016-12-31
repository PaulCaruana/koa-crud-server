var path = require('path');
var annotations = require('conga-annotations');
var fs = require('fs');
var GeneratorReader = require('../GeneratorReader');
var glob = require('glob-fs')({ gitignore: true });

// create the registry
var registry = new annotations.Registry();

var RouteParser = function () {
    // Add annotations to the registry
    registry.registerAnnotation(path.join(__dirname, 'router'));
    registry.registerAnnotation(path.join(__dirname, 'route'));
};

RouteParser.prototype = {
    constructor: RouteParser,
    parseComponents: function(root, relativePaths) {
        var routers = this._parseBaseComponents(root, relativePaths);
        this._mergeNestedRouters(routers);
        return routers;
    },

    _parseBaseComponents: function(root, relativePaths) {
        var self = this;
        var routers = {};
        var allFiles = this._getFolderFiles(root, relativePaths);
        allFiles.forEach(function(file) {
            var reader = self._parseComponent(root, file);
            var router = self._readerToInjectable(reader);
            if (router) {
                var id = router.id;
                routers[id] = router;
            }
        });
        return routers;

    },

    _getFolderFiles: function (root, relativePaths) {
        var glob = require('glob-fs')({gitignore: true});
        var allFiles = [];
        relativePaths.forEach(function(path) {
            var files = glob.readdirSync(path, {cwd: root});
            allFiles = allFiles.concat(files);
        });
        return allFiles;
    },

    _parseComponent: function(root, file) {
        var reader = new GeneratorReader(registry);
        var filePath = path.join(root, file);
        reader.parse(filePath);
        return reader;
    },

    _readerToInjectable: function(reader) {
        var routerAnnotations = reader.getConstructorAnnotations();
        if (!routerAnnotations || routerAnnotations.length == 0) {
            return null;
        }
        var router = {};
        routerAnnotations.forEach(function (routerAnnotation) {
            router = {
                filePath: routerAnnotation.filePath,
                options: routerAnnotation.options,
                id: routerAnnotation.value || routerAnnotation.target,
                target: routerAnnotation.target,
                prefix: routerAnnotation.prefix,
                nested: routerAnnotation.nested,
                routes: {}
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
            router.routes[route.target] = route;
        });
        return router;
    },

    _mergeNestedRouters: function(routers) {
        var self = this;
        for (id in routers) {
            var router = routers[id];
            if (router.nested && router.nested.length > 0) {
                var nestedRouter = routers[router.nested];
                self._mergeNestedRouter(routers, router);
            }
        }
        for (id in routers) {
            var router = routers[id];
            if (router.excluded) {
                delete routers[router.id];
            }
        }
    },

    _mergeNestedRouter: function(routers, router) {
        var self = this;
        if (router.nested && router.nested.length > 0) {
            for (var i=0;i<router.nested.length;i++) {
                var nestedAnnotation = router.nested[i];
                var nestedRouter = routers[nestedAnnotation];
                if (nestedRouter) {
                    // Check if nest router has nested routers
                    self._mergeNestedRouter(routers, nestedRouter);
                    self._mergeRoutes(router, nestedRouter);
                }
            }
        }
    },

    _mergeRoutes: function(router, nestedRouter) {
        var routes = router.routes;
        var nestedRoutes = nestedRouter.routes;
        for (target in nestedRoutes) {
            if (!routes[target]) {
                routes[target] = nestedRoutes[target];
            }
        };
        nestedRouter.excluded = (nestedRouter.excluded == false)? false : true;
    }


};
module.exports = RouteParser;
