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
        this.body = 'Hello...';
    },
    /**
     * @Route('/:userId')
     */
    get: function*(next){
        this.body = 'Hello ' + this.params.id;
    },
    /**
     * @Route('/world')
     */
    helloWorld: helloWorld2
};
function* helloWorld2(next) {
    this.body = 'Hello World!...';
}
module.exports = UserController;