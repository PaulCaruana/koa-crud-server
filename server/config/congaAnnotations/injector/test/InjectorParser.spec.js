var expect = require("chai").expect;
var InjectorParser = require('../InjectorParser');

describe('InjectorParser', function() {
    it('should return selected files', function(done) {
        var injectorParser = new InjectorParser();
        var files = injectorParser._getFolderFiles(__dirname , ["/samples/**/*.js"]);
        expect(files).to.eql(['samples/TestController.js']);
        done();
    });

    it('should return parsed reader', function(done) {
        var injectorParser = new InjectorParser();
        var reader = injectorParser._parseComponent(__dirname , 'samples/TestController.js');
        expect(reader).to.exist;
        done();
    });

    it('should return valid injectable object', function(done) {
        var injectorParser = new InjectorParser();
        var reader = injectorParser._parseComponent(__dirname , 'samples/TestController.js');
        var injectable = injectorParser._readerToInjectable(reader);
        expect(injectable.id).to.equal('TestController')
        expect(injectable.injectable).to.equal(true);
        expect(injectable.filePath).to.equal(__dirname + '/samples/TestController.js');
        expect(injectable.params).to.deep.equal({ model: 'model.test' });
        done();
    });

    it('should return a valid injectables object', function(done) {
        var injectorParser = new InjectorParser();
        var injectables = injectorParser.parseComponents(__dirname , ["/samples/**/*.js"]);
        expect(injectables).to.exist;
        expect(injectables['TestController']).to.exist;
        done();
    });

});
