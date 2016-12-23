var annotations = require('conga-annotations');
var Parser = require('conga-annotations/lib/parser');
var T_GENERATOR_FUNCTION = /(\w+)(.*): *function[\*]?\((.*)\)/;
Parser.prototype.T_FUNCTION = T_GENERATOR_FUNCTION;

function GeneratorReader(registry) {
    var reader = new annotations.Reader(registry);
    this.parse = function(path) {
        reader.parse(path);
    };
    this.getConstructorAnnotations = reader.getConstructorAnnotations;
    this.getMethodAnnotations = reader.getMethodAnnotations;
    this.getPropertyAnnotations = reader.getPropertyAnnotations;
 }
module.exports = GeneratorReader;