// my-parser.js
// ------------

var path = require('path');
var annotations = require('conga-annotations');

// create the registry
var registry = new annotations.Registry();

// add annotations to the registry
registry.registerAnnotation(path.join(__dirname, 'router'));
registry.registerAnnotation(path.join(__dirname, 'route'));

// create the annotation reader
var GeneratorReader =  require('./GeneratorReader');
var reader = new GeneratorReader(registry);

// parse the annotations from a file
reader.parse(path.join(__dirname, 'routerSample.js'));

// get the annotations
var constructorAnnotations = reader.getConstructorAnnotations();
var methodAnnotations = reader.getMethodAnnotations();
var propertyAnnotations = reader.getPropertyAnnotations();

// loop through and handle the annotations
constructorAnnotations.forEach(function(annotation){

    // @MyConstructorAnnotation
    if (annotation.annotation === 'router'){

        // do something with the annotation data
        console.log(annotation.target); // -> "MySample"
        console.log(annotation.options); // -> "here is an attribute value"
    }

});
methodAnnotations.forEach(function(annotation){

    // @MyConstructorAnnotation
    if (annotation.annotation === 'route'){

        // do something with the annotation data
        console.log(annotation.target); // -> "MySample"
        console.log(annotation.value); // -> "some value"
        console.log(annotation.method); // -> "here is an attribute value"
    }

});

var RouterParser = function(module) {

};