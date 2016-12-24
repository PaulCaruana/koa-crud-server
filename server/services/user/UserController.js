// src/my-bundle/lib/controller/default.js

/**
 * @router(options={methods:['GET', 'POST', 'PUT', 'DELETE']})
 */
function UserController(){};

UserController.prototype = {
    /**
     * @route('/user/:id')
     */
    user: function*(next){
        this.body = 'Hello pc';
    },

    /**
     * @route
     */
    hello: function*(next){
        this.body = 'Hello World!...';
    },

};

module.exports = UserController;