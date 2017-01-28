
var Annotation = require('conga-annotations').Annotation;

module.exports = Annotation.extend({

    /**
     * The name of the annotation

     * @type {String}
     */
    annotation: 'Route',

    /**
     * The possible targets
     *
     * (Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD)
     *
     * @type {Array}
     */
    targets: [Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD],

    /**
     * Optional initialization method that
     * can be used to transform data
     *
     * @param  {Object} data
     * @return {void}
     */
    init: function(data){
        this.value = (typeof data.value !== 'undefined') ? data.value : '/';
        if (typeof data.method !== 'undefined') {
            if (Array.isArray(data.method)) {
                this.method.map(function(x){ return x.toUpperCase() })
            } else {
                this.method = data.method.toUpperCase();
            }
        } else {
            this.method = 'GET';
        }
    }

});