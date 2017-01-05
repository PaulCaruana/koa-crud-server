exports = module.exports = function (routers, application) {
    var locator = application.locator;
    var appRouter = application.router;

    Object.keys(routers).forEach(function (key) {
        var router = routers[key];
        var prefix = (router.prefix) ? router.prefix : "";
        var id = router.id;
        var module = locator.get(id);
        Object.keys(router.routes).forEach(function (key) {
            var route = router.routes[key];
            var method = route.method.toLowerCase();
            var property = route.target;
            var matcher = prefix + route.matcher;

            // console.log(matcher)
           //  console.log(property)

            appRouter[method](matcher, module[property]);
        });
    });
    var dao = {};
    dao.get = function *(next) {
        yield next;
        this.body = 'Hello World!.';
    };
    /*
     //var g = gen();
     // g.next();
     yield next;
     this.body = 'Hello World!.';
     });
     */


        function *nest(next){

            yield fn1.call(this, next);
             //next = fn2.call(this, next);


           // console.log('a')
   //         var x = yield *next;
            //console.log('b')
   //          return x

        }

    var fn1 = function *(next) {
        yield next;
        console.log('3')
        console.log('4')
        this.body = 'Hello1';
    }

    var fn2 = function *(next) {
        yield next;
        console.log('1')
        console.log('2')
        this.body = this.body + 'Hello2';
    };
    appRouter.get("/", nest)

};