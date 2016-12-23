// src/my-bundle/lib/controller/default.js

/**
 * @router(options={methods:['GET', 'POST', 'PUT', 'DELETE']})
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