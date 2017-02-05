/**
 * @Injectable
 * @Inject(dao="userData['dao']")
 * @Router(prefix="/users", nested="CrudController")
 */
exports = module.exports = (function UserController() {
    var crudController = require('../shared/crud.controller');
    return function UserController(dao) {
        return Object.assign(crudController(dao), {
            /**
             * @Route('/hello')
             */
            hello: function*(next) {
                yield next;
                this.body = {"test" : "ok"};
            }
        })
    };
})();
