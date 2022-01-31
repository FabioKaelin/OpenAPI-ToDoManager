// var assert = require('assert');
// var request = require('supertest');
// var app = require('../api');
// var { Unauthorized, GeneralError } = require('../utils/errors');

// describe('API Response Errors', function () {
//   describe('GET /', function () {
//     it('/ responds with NotFound as JSON and 404', function (done) {
//       request(app)
//         .get('/')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(404, done);
//     });
//   });
//   describe('GET /unauthorized', function () {
//     it('/unauthorized responds with unauthorized as JSON', function (done) {
//       request(app)
//         .get('/v1/unauthorized')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(401, done);
//     });
//   });
//   describe('GET /unauthorized', function () {
//     it('/unauthorized responds with unauthorized as data{}', function (done) {
//       request(app)
//         .get('/v1/unauthorized')
//         .set('Accept', 'application/json')
//         .expect(function (res) {
//           assert(res.body.data, {});
//         })
//         .expect(401, done);
//     });
//   });
//   describe('GET /unauthorized', function () {
//     it('/unauthorized responds with unauthorized as message', function (done) {
//       request(app)
//         .get('/v1/unauthorized')
//         .set('Accept', 'application/json')
//         .expect(function (res) {
//           assert(res.body.message, 'You are not authorized');
//         })
//         .expect(401, done);
//     });
//   });
//   describe('GET /unauthorized', function () {
//     it('unauthorized responds with unauthorized as code', function (done) {
//       request(app)
//         .get('/v1/unauthorized')
//         .set('Accept', 'application/json')
//         .expect(function (res) {
//           assert(res.body.code, 401);
//         })
//         .expect(401, done);
//     });
//   });

//   describe('GET /', function () {
//     it('/ responds with unauthorized as JSON and 401', function (done) {
//       request(app)
//         .get('/')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(404, done);
//     });
//   });
//   describe('GET /', function () {
//     it('/ responds with notfound as message', function (done) {
//       request(app)
//         .get('/')
//         .set('Accept', 'application/json')
//         .expect(function (res) {
//           assert(res.body.message, "I didn't found what you requested.");
//         })
//         .expect(404, done);
//     });
//   });
//   describe('GET /', function () {
//     it('/ responds with notfound as code', function (done) {
//       request(app)
//         .get('/')
//         .set('Accept', 'application/json')
//         .expect(function (res) {
//           assert(res.body.code, 404);
//         })
//         .expect(404, done);
//     });
//   });
// });
