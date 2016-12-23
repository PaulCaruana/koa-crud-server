// src/my-bundle/lib/controller/default.js

/**
 * @router
 */
function HelloController(){};

HelloController.prototype = {

    /**
     * @route
     */
    hello: function*(next){
    },
    /**
     * @route('users/:userId')
     */
    get: function(next){
    }

};

module.exports = HelloController;