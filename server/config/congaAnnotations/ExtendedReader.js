var annotations = require('conga-annotations');
var Parser = require('conga-annotations/lib/parser');
var T_GENERATOR_FUNCTION = /(\w+)(.*): *function[\*]?\((.*)\)/;
Parser.prototype.T_FUNCTION = T_GENERATOR_FUNCTION;
Parser.prototype.T_CONSTRUCTOR_FUNCTION_VARIABLE = /var (.*) = [\(]function\((.*)\)/;

function ExtendedReader(registry) {
    var reader = new annotations.Reader(registry);
    var self = this;
    this.parse = function(path) {
        reader.parse(path);
        self.getConstructorAnnotations = reader.getConstructorAnnotations;
        self.getMethodAnnotations = reader.getMethodAnnotations;
        self.getPropertyAnnotations = reader.getPropertyAnnotations;
    };
 }
module.exports = ExtendedReader;