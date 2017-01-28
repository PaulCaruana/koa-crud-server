/* jshint unused:false */
'use strict';

var expect = require("chai").expect;
var config = require('../../config');
var application = require('../../application').create(config);
var locator = application.locator;
var dao = locator.get('userData').dao;
dao.request = {};

var request = require('supertest').agent(application.startSimpleServer());
var savedSamples = [];
var updateSample;
var samples = [
    {
        "provider": "local",
        "name": "user1",
        "active": true,
        "role": "user",
        "password": "userpsw"
    },
    {
        "provider": "local",
        "name": "user2",
        "active": true,
        "role": "user",
        "password": "otherpsw"
    },
    {
        "provider": "local",
        "name": "admin1",
        "active": true,
        "role": "admin",
        "password": "adminpsw"
    }
];

function* createSamples() {
    savedSamples = [];
    for(var i=0;i<samples.length-1;i++) {
        var sample = samples[i];
        dao.request.body = sample;
        savedSamples.push(yield dao.create(next))
    }
    updateSample = samples[samples.length - 1]
}

function* removeAll() {
    yield dao.deleteAll(next);
}

function matchArray(actualSet, expectedSet) {
    expect(actualSet.length).to.equal(expectedSet.length);
    for (var i = 0, len = actualSet.length; i < len; i++) {
        matchObj(actualSet[i], expectedSet[i]);
    }
}

function matchObj(actual, expected) {
    for (var key in actual) {
        if (key.charAt(0) != '_') {
            expect(actual[key]).to.equal(expected[key]);
        }
    }
}

function* next() {}

describe('/users api', function () {
    before(removeAll);

    beforeEach(createSamples)

    afterEach(removeAll);

            describe('GET', function () {

                describe('/users', function () {
                    it('should respond with JSON for all records', function (done) {
                        request
                            .get('/users')
                            .expect(200)
                            .expect('Content-Type', /json/)
                            .expect(function (res) {
                                matchArray(res.body, savedSamples)
                            })
                            .end(done);
                    })
                });

                describe('/users/:id', function () {
                    it('should respond with JSON for the record with the specified id', function (done) {
                        var expectedResult = savedSamples[0];
                        var path = '/users/' + expectedResult._id;
                        request
                            .get(path)
                            .expect(200)
                            .expect('Content-Type', /json/)
                            .expect(function (res) {
                                matchObj(res.body, expectedResult)
                            })
                            .end(done);
                    })
                });

                describe('/users/invalid', function () {
                    it('should respond with an error for a malformed parameter', function (done) {
                        request
                            .get('/users/invalid')
                            .expect(400)
                            .expect('Content-Type', /json/)
                            .end(done)
                    });
                });

                describe('/users/cccccccccccccccccccccccc', function () {
                    it('should respond with an not found error for a not existing record', function (done) {
                        request
                            .get('/users/cccccccccccccccccccccccc')
                            .expect(204)
                            .end(done)
                    });
                });

            });

            describe('POST', function () {
                describe('/users', function () {
                    it('should respond with JSON for the created record', function (done) {
                        request
                            .post('/users')
                            .send(updateSample)
                            .expect(201)
                            .expect(function (res) {
                                matchArray(res.body, updateSample)
                            })
                            .end(done)
                    });
                });

                describe('/users/:id', function () {
                    it('should respond with JSON for the updated record', function (done) {
                        var user1 = savedSamples[0];
                        var path = '/users/' + user1._id;
                        request
                            .patch(path)
                            .send(updateSample)
                            .expect(200)
                            .expect(function (res) {
                                matchObj(res.body, updateSample)
                            })
                            .end(done)
                    });
                });

                describe('/users/invalid', function () {
                    it('should respond with an error for a malformed parameter', function (done) {
                        request
                            .post('/users/invalid')
                            .expect(400)
                            .expect('Content-Type', /json/)
                            .end(done)
                    });
                });

                describe('/users/cccccccccccccccccccccccc', function () {
                    it('should respond with an not found error for a not existing record', function (done) {
                        request
                            .post('/users/cccccccccccccccccccccccc')
                            .expect(204)
                            .end(done)
                    });
                });
            });

            describe('DELETE', function () {
                describe('/users/:id', function () {
                    it('should respond with JSON for the destroyed record', function (done) {
                        var user1 = savedSamples[0];
                        var path = '/users/' + user1._id;
                        request
                            .del(path)
                            .expect(200)
                            .expect(function (res) {
                                expect(res.body.name).to.equal(user1.name);
                            })
                            .end(function () {
                                request
                                    .get(path)
                                    .expect(204)
                                    .end(function (err, res) {
                                        done();
                                    });

                            })
                    });
                });

                describe('/users/invalid', function () {
                    it('should respond with an error for a malformed parameter', function (done) {
                        request
                            .post('/users/invalid')
                            .expect(400)
                            .expect('Content-Type', /json/)
                            .end(done)
                    });
                });

                describe('/users/cccccccccccccccccccccccc', function () {
                    it('should respond with an not found error for a not existing record', function (done) {
                        request
                            .post('/users/cccccccccccccccccccccccc')
                            .expect(204)
                            .end(done)
                    });
                });

            });

            describe('PUT', function () {

                describe('/users', function () {
                    it('should respond with JSON for the created record', function (done) {
                        request
                            .put('/users')
                            .send(updateSample)
                            .expect(201)
                            .expect(function (res) {
                                matchArray(res.body, updateSample)
                            })
                            .end(done)
                    });
                });

                describe('/users/:id', function () {
                    it('should respond with JSON for the updated record', function (done) {
                        var user1 = savedSamples[0];
                        var path = '/users/' + user1._id;
                        request
                            .put(path)
                            .send(updateSample)
                            .expect(200)
                            .expect(function (res) {
                                matchObj(res.body, updateSample)
                            })
                            .end(done)
                    });
                });

                describe('/users/invalid', function () {
                    it('should respond with an error for a malformed parameter', function (done) {
                        request
                            .put('/users/invalid')
                            .expect(400)
                            .expect('Content-Type', /json/)
                            .end(done)
                    });
                });

                describe('/users/cccccccccccccccccccccccc', function () {
                    it('should respond with an not found error for a not existing record', function (done) {
                        request
                            .put('/users/cccccccccccccccccccccccc')
                            .send(updateSample)
                            .expect(200)
                            .end(done)
                    });
                });
            });

            describe('PATCH', function () {

                describe('PATCH /users/:id', function () {
                    it('should respond with JSON for the updated record', function (done) {
                        var user1 = savedSamples[0];
                        var path = '/users/' + user1._id;
                        request
                            .patch(path)
                            .send(updateSample)
                            .expect(200)
                            .expect(function (res) {
                                matchObj(res.body, updateSample)
                            })
                            .end(done)
                    });
                });
            });


});

