// my-parser.js

var path = require('path');
var annotations = require('conga-annotations');

// load the annotation to compare against
var MyConstructorAnnotation = require('./my-constructor-annotation');

// create the registry
var registry = new annotations.Registry();

// add annotations to the registry
registry.registerAnnotation(path.join(__dirname, 'my-constructor-annotation'));

// create the annotation reader
var reader = new annotations.Reader(registry);

// parse the annotations from a file
reader.parse(path.join(__dirname, 'my-sample.js'));

// get the annotations
var constructorAnnotations = reader.getConstructorAnnotations();
var methodAnnotations = reader.getMethodAnnotations();
var propertyAnnotations = reader.getPropertyAnnotations();

// loop through and handle the annotations
constructorAnnotations.forEach(function(annotation){

    // @MyConstructorAnnotation
    if (annotation instanceof MyConstructorAnnotation){

        // do something with the annotation data
        console.log(annotation.target); // -> "MySample"
        console.log(annotation.value); // -> "some value"
        console.log(annotation.method); // -> "here is an attribute value"
    }

});