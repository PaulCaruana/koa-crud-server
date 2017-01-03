/**
 * @Injectable
 * @Inject(model="user.model")
 * @Router(prefix="/users")
 */
exports = module.exports = (function UserController() {
    var Class = function(model) {
        this._model = model;
    };

    Class.prototype = {
        /**
         * @Route('/:id')
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
    return Class;
})();
