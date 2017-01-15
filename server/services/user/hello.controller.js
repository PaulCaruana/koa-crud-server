exports = module.exports = (function HelloController() {
    return function HelloController() {
        return {
             hello: function*(next) {
                console.log("helloxxx...")
                yield next;
                this.body = {"test" : "yesxxx"};
            }
        }
    };
})();
