/* jshint unused:false */
'use strict';

//var should = require('should');
var config = require('../../config');
var application = require('../../application').create(config);
var app2 = application.server;

var request = require('supertest').agent(application.server.listen());
//application.startDB();


describe('User', function () {
    describe('GET /:model', function () {
        it('should respond with JSON for all records', function(done) {
            request
                .get('/users/hello')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(done);

        });
    });
});

// Clear all cats
/*
function cleanup(done) {
    catModel.model.remove().exec().then(function () { done();	});
}
*/
/*

describe('/api/cats', function () {

    var cat;

    // reset cat before each test
    beforeEach(function () {
        cat = {
            name: 'Dog',
            info: 'Hello, this is dog.',
            active: true
        };
    });

    // Clear cats before each test
    beforeEach(cleanup);

    // Clear cats after each test
    afterEach(cleanup);

    describe('GET', function () {

        it('should respond with JSON array', function (done) {
            request(app)
                .get('/api/cats')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    res.body.should.be.instanceof(Array);
                    done();
                });
        });

        it('should respond with an error for a malformed cat id parameter', function (done) {
            request(app)
                .get('/api/cats/malformedid')
                .set('Accept', 'application/json')
                .expect(400)
                .expect('Content-Type', /json/)
                .end(done);
        });

        it('should respond with an not found error for a not existing cat id', function (done) {
            request(app)
                .get('/api/cats/cccccccccccccccccccccccc')
                .set('Accept', 'application/json')
                .expect(404)
                .expect('Content-Type', /json/)
                .end(done);
        });

        it('should return a cat for its id', function (done) {
            catModel.model(cat).save(function (err, doc) {
                request(app)
                    .get('/api/cats/' + doc._id)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        res.body.should.be.an.Object.and.have.properties(cat);
                        res.body._id.should.exist;
                        done();
                    });
            });
        });

    });

    describe('POST', function () {

        it('should create a new cat and respond with 201 and the created cat', function (done) {
            request(app)
                .post('/api/cats')
                .set('Accept', 'application/json')
                .send(cat)
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    res.body.should.be.an.Object.and.have.properties(cat);
                    res.body._id.should.exist;
                    done();
                });
        });

    });

    describe('PUT', function () {

        it('should return an error if attempting a put without an id', function (done) {
            request(app)
                .put('/api/cats')
                .set('Accept', 'application/json')
                .send(cat)
                .expect(404)
                .end(done);
        });

        it('should respond with an not found error for a not existing cat id', function (done) {
            request(app)
                .put('/api/cats/cccccccccccccccccccccccc')
                .set('Accept', 'application/json')
                .expect(404)
                .expect('Content-Type', /json/)
                .end(done);
        });

        it('should update a cat and respond with the updated cat', function (done) {
            request(app)
                .post('/api/cats')
                .set('Accept', 'application/json')
                .send(cat)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    cat.name = 'Cat';
                    // check if id is stripped on update
                    cat._id = 'malformed id string';
                    request(app)
                        .put('/api/cats/' + res.body._id)
                        .set('Accept', 'application/json')
                        .send(cat)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end(function (err, res) {
                            if (err) {
                                return done(err);
                            }
                            res.body.should.be.an.Object.and.have.property('name', cat.name);
                            done();
                        });
                });
        });

    });

    describe('DELETE', function () {

        it('should return an error if attempting a delete without an id', function (done) {
            request(app)
                .delete('/api/cats')
                .set('Accept', 'application/json')
                .expect(404)
                .end(done);
        });

        it('should respond with an not found error for a not existing cat id', function (done) {
            request(app)
                .delete('/api/cats/cccccccccccccccccccccccc')
                .set('Accept', 'application/json')
                .expect(404)
                .expect('Content-Type', /json/)
                .end(done);
        });

        it('should delete a cat and respond with 204', function (done) {
            request(app)
                .post('/api/cats')
                .set('Accept', 'application/json')
                .send(cat)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    request(app)
                        .delete('/api/cats/' + res.body._id)
                        .set('Accept', 'application/json')
                        .expect(204)
                        .end(done);
                });
        });
    });
});
*/
