var assert = require('assert');
var request = require('supertest');
var app = require('../api');

describe('API Endpoints', function () {
  describe('GET /v1/ping', function () {
    it('responds with JSON', function (done) {
      request(app)
        .get('/v1/ping')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    // it('responds with given parameter', function(done) {
    // });
    // it('fails if parameter contain reserved characters like !', function(done) {
    // });
  });
  describe('GET /v1/healthcheck', function () {
    it('responds with JSON', function (done) {
      request(app)
        .get('/v1/healthcheck')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    // it('responds with given parameter', function(done) {
    // });
    // it('fails if parameter contain reserved characters like !', function(done) {
    // });
  });
});
