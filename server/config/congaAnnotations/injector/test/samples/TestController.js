/**
 * @Injectable
 * @Inject(model="user.model")
 * @Router("User", prefix="/users", nested="CrudController")
 */
exports = module.exports = (function TestController() {
    var Class = function(model) {
        this._model = model;
    };

    Class.prototype = {
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
    return Class;
})();