// src/my-bundle/lib/controller/default.js

/**
 * @Router("User", prefix="/users", nested="CrudController")
 */
function UserController(){};

UserController.prototype = {

    /**
     * @Route
     */
    hello: function*(next){
        this.body = 'Hello World!...';
    },
    /**
     * @Route('/:userId')
     */
    get: function*(next){
        this.body = 'Hello ' + this.params.id;
    }

};

module.exports = UserController;