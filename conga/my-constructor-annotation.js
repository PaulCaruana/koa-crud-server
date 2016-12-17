// my-constructor-annotation.js
var Annotation = require('conga-annotations').Annotation;

var MyConstructorAnnotation = function(data){
    this.value = (typeof data.value !== 'undefined') ? data.value : '/';
    this.method = (typeof data.method !== 'undefined')? data.value.toUpperCase() : 'GET';
};

/**
 * Define the annotation string to find
 *
 * @var {String}
 */
MyConstructorAnnotation.annotation = 'MyConstructorAnnotation';

/**
 * Define the targets that the annotation can be applied to
 *
 * Possible targets: Annotation.CONSTRUCTOR, Annotation.METHOD, Annotation.PROPERTY
 *
 * @var {Array}
 */
MyConstructorAnnotation.targets = [Annotation.CONSTRUCTOR];

/**
 * The value of the annotation
 *
 * @type {String}
 */
MyConstructorAnnotation.prototype.value = null;

/**
 * An attribute for the annotation
 *
 * @var {String}
 */
MyConstructorAnnotation.prototype.method = null;

module.exports = MyConstructorAnnotation;