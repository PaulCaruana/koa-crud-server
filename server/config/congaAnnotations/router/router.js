var Annotation = require('conga-annotations').Annotation;

var annotation = {};

module.exports = Annotation.extend({

    /**
     * The name of the annotation

     * @type {String}
     */
    annotation: 'Router',

    /**
     * The possible targets
     *
     * (Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD)
     *
     * @type {Array}
     */
    targets: [Annotation.CONSTRUCTOR],

    /**
     * Optional initialization method that
     * can be used to transform data
     *
     * @param  {Object} data
     * @return {void}
     */
    init: function(data){
        this.nested = data.nested || [];
        this.nested = (typeof this.nested === 'string')? [this.nested] : this.nested;
        this.options = (typeof data.options !== 'undefined') ? data.options : {};
        this.options.methods = (typeof this.options.methods !== 'undefined')? this.options.methods : ['GET', 'POST', 'PUT', 'DELETE'];
    }

});