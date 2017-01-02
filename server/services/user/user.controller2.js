/**
 * @Injectable
 * @Inject(model="user.model")
 * @Router(options={methods:['GET', 'POST', 'PUT', 'DELETE']})
 */
function UserController(model){;
}
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
    },

/*
    sayHello: function() {
        return model;
    }
*/

};

module.exports = UserController;