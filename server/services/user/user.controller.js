/**
 * @Injectable
 * @Inject(model="userModel['model']")
 * @Router(prefix="/users")
 */
exports = module.exports = (function UserController() {
    var Class = function (model) {
       // console.log("here2")
       //console.log(model)
        this._model = model;
    };

    var dao = {};
    dao.user = function (self, next) {
       // console.log(next)
        self.body = 'Hello ' + self.params.id;

    }

    Class.prototype = {
        /**
         * @Route('/:id')
         */
        user: function*(next) {
            yield next;
//            dao.user(this, next)
        },

        /**
         * @Route
         */
        hello: function*(next) {
            yield next;
            this.body = 'Hello World!...';
        }
    };
    return Class;
})();
