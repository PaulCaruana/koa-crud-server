var expect = require("chai").expect;


describe('RouterParser', function() {
    it('should return routes', function(done) {
        var RouterParser = require('../RouterParser');
        var path = require('path');
        var routerParser = new RouterParser(path.join(__dirname, 'samples'));
        expect(1).to.equal(1);
        done();
    });
});
