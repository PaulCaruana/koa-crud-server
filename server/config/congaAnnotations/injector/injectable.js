var Annotation = require('conga-annotations').Annotation;

var annotation = {};

module.exports = Annotation.extend({

    /**
     * The name of the annotation

     * @type {String}
     */
    annotation: 'Injectable',

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
        this.type = "Injectable";
        this.id = (typeof data.value !== 'undefined') ? data.value : data.target;
        this.singleton = (typeof data.singleton !== 'undefined') ? data.singleton : true;
    }

});