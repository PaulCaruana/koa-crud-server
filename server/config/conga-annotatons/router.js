var Annotation = require('conga-annotations').Annotation;

module.exports = Annotation.extend({

    /**
     * The name of the annotation

     * @type {String}
     */
    annotation: 'router',

    /**
     * The possible targets
     *
     * (Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD)
     *
     * @type {Array}
     */
    targets: [Annotation.CONSTRUCTOR],

    /**
     * An additional attribute
     *
     * @type {String}
     */
    options: {
        methods : ['GET', 'POST', 'PUT', 'DELETE']
    },

    /**
     * Optional initialization method that
     * can be used to transform data
     *
     * @param  {Object} data
     * @return {void}
     */
    init: function(data){
    }

});