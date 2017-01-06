var expect = require("chai").expect;
var RouterParser = require('../RouterParser');


describe('RouterParser', function() {

    it('should return selected files', function(done) {
        var routerParser = new RouterParser();
        var files = routerParser._getFolderFiles(__dirname , ["/samples/**/*.js"]);
        expect(files.length).to.equal(3);
        expect(files[0].indexOf("samples/") > -1).to.be.true;
        done();
    });

    it('should return parsed reader', function(done) {
        var routerParser = new RouterParser();
        var reader = routerParser._parseComponent(__dirname , 'samples/CrudController.js');
        expect(reader).to.exist;
        done();
    });

    it('should return valid router object', function(done) {
        var routerParser = new RouterParser();
        var reader = routerParser._parseComponent(__dirname , 'samples/UserController.js');
        var router = routerParser._readerToInjectable(reader);
        expect(router.options.methods).to.eql([ 'GET', 'POST', 'PUT', 'DELETE' ]);
        expect(router.id).to.equal('User');
        expect(router.prefix).to.equal('/users');
        expect(router.nested).to.eql([ 'CrudController' ]);
        expect(router.routes.hello).to.eql({ matcher: '/', method: 'GET', target: 'hello' });
        expect(router.routes.get).to.eql({ matcher: '/:userId', method: 'GET', target: 'get' });
        expect(router.routes.helloWorld).to.eql({ matcher: '/world', method: 'GET', target: 'helloWorld' });
        done();
    });

    it('should return a merged router object', function(done) {
        var routerParser = new RouterParser();
        var routers = routerParser._parseBaseComponents(__dirname , ["/samples/**/*.js"]);
        routerParser._mergeRoutes(routers.User, routers.CrudController);
        var userRoutes = routers.User.routes;
        expect(userRoutes.hello).to.exist;
        expect(userRoutes.get).to.exist;
        expect(userRoutes.put).to.exist;
        expect(userRoutes.get.matcher).to.equal('/:userId');
        expect(routers.CrudController.excluded).to.be.true;
        expect(Object.keys(routers).length).to.equal(2);
        done();
    });

    it('should return a merged nested router object', function(done) {
        var routerParser = new RouterParser();
        var routers = routerParser._parseBaseComponents(__dirname, ["/samples/**/*.js"]);
        routerParser._mergeNestedRouter(routers, routers.User);
        var userRoutes = routers.User.routes;
        expect(routers.User.routes.put).to.exist;
        done();
    });

    it('should return merged router within routers object', function(done) {
        var routerParser = new RouterParser();
        var routers = routerParser._parseBaseComponents(__dirname, ["/samples/**/*.js"]);
        routerParser._mergeNestedRouters(routers);
        var userRoutes = routers.User.routes;
        expect(routers.User.routes.put).to.exist;
        expect(routers.CrudController).to.be.undefined;
        done();
    });

    it('should return a valid routers object', function(done) {
        var routerParser = new RouterParser();
        var routers = routerParser.parseComponents(__dirname, ["/samples/**/*.js"]);
        expect(routers.User.routes.put).to.exist;
        expect(Object.keys(routers).length).to.equal(1);
        done();
    });
});
