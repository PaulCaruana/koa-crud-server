// src/my-bundle/lib/controller/default.js

/**
 * @Injectable()
 * @Router(options={methods:['GET', 'POST', 'PUT', 'DELETE']})
 */
function UserController(db){};

UserController.prototype = {
    /**
     * @Route('/user/:id')
     */
    user: function*(next){
        yield next;
        this.body = 'Hello ' + this.params.id;
    },

    /**
     * @Route
     */
    hello: function*(next){
        yield next;
        this.body = 'Hello World!...';
    }

};

module.exports = UserController;