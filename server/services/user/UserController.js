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
        yield next;
        this.body = 'Hello ' + this.params.id;
    },

    /**
     * @route
     */
    hello: function*(next){
        yield next;
        this.body = 'Hello World!...';
    }

};

module.exports = UserController;