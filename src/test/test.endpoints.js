// var assert = require('assert');
// var request = require('supertest');
// var app = require('../api');

// describe('API Endpoints', function () {
//   // describe('GET /v1/ping', function () {
//   //   it('/ping responds with JSON', function (done) {
//   //     request(app)
//   //       .get('/v1/ping')
//   //       .set('Accept', 'application/json')
//   //       .expect('Content-Type', /json/)
//   //       .expect(200, done);
//   //   });
//   // });
//   describe('GET /v1/healthcheck', function () {
//     it('/healthcheck responds with JSON', function (done) {
//       request(app)
//         .get('/v1/healthcheck')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done);
//     });
//   });
//   describe('GET /v1/uuid', function () {
//     it('/uuid responds with JSON', function (done) {
//       request(app)
//         .get('/v1/uuid')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done);
//     });
//   });
//   describe('GET /v1/uuid', function () {
//     it('/uuid responds has 32 characters', function (done) {
//       request(app)
//         .get('/v1/uuid')
//         .set('Accept', 'application/json')
//         .expect(function (res) {
//           uuidinhalt = String(res.body.data.uuid);
//           assert(uuidinhalt.length, 32);
//         })
//         .expect(200, done);
//     });
//   });
// });
