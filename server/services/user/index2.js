var user = function(router) {
    router
        .get('/', function *(next) {
            this.body = 'Hello World!';
        })
        .get('/user/:id', function*(next) {
            this.body = 'Hello ' + this.params.id;
        })
};
exports = module.exports = user;