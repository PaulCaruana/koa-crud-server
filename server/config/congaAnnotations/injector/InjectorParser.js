var path = require('path');
var annotations = require('conga-annotations');
var fs = require('fs');
var GeneratorReader = require('../GeneratorReader');

// create the registry
var registry = new annotations.Registry();

var InjectorParser = function (root, paths) {
// add annotations to the registry
    registry.registerAnnotation(path.join(__dirname, 'injectable'));
    registry.registerAnnotation(path.join(__dirname, 'inject'));
};

InjectorParser.prototype = {
    constructor: InjectorParser,

    parseComponents: function(root, relativePaths) {
        var self = this;
        var injectables = {};
        var allFiles = this._getFolderFiles(root, relativePaths);
        allFiles.forEach(function(file) {
            var reader = self._parseComponent(root, file);
            var injectable = self._readerToInjectable(reader);
            if (injectable) {
                var id = injectable.id;
                injectables[id] = injectable;
            }
        });
        return injectables;

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
        var injectable;
        var injectableAnnotations = reader.getConstructorAnnotations();
        injectableAnnotations.forEach(function (injectableAnnotation) {
            injectable = injectable || {};
            injectable.filePath = injectableAnnotation.filePath;
            injectable.target = injectableAnnotation.target;
            if (injectableAnnotation.type === "Injectable") {
                injectable.injectable = true;
                injectable.id = injectableAnnotation.id || injectableAnnotation.target;
                injectable.singleton = injectableAnnotation.singleton;
            } else {
                injectable.params = injectableAnnotation.params;
            }
        });
        return injectable;
    }
};

module.exports = InjectorParser;
