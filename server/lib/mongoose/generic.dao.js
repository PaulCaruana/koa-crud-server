exports = module.exports = (function GenericDao(model) {
    return {
        findById: function *(next) {
            yield next;
            this.body = 'Hello1';
        }
    }
})();
