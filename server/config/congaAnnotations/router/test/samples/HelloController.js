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
        this.body = 'Hello World!...';
    },
    /**
     * @route('users/:userId')
     */
    get: function*(next){
        this.body = 'Hello ' + this.params.id;
    }

};

module.exports = HelloController;