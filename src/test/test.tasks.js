var expect = require('chai').expect;
var assert = require('assert');
require('dotenv').config();
const db = require('../utils/db'); // your db module
const logger = require('../utils/logger');

let uuid = '';
let owner = 'd5e30d8f-a59d-45f3-b9ea-01e742163ff5'; // hugo@m295.local.zli.ch

let task = {
  //id: "2aad2837-c622-43f8-848a-8a70af6a314c",
  owner: 'd5e30d8f-a59d-45f3-b9ea-01e742163ff5',
  description: 'This is a test task for unit testing.',
};

describe('Tasks Model', function () {
  let data = {
    owner: 'd5e30d8f-a59d-45f3-b9ea-01e742163ff5',
    description: 'This is a test task for unit testing.',
  };
  beforeEach(function (done) {
    db.tasks.id().then(function (response) {
      data = Object.assign(data, response);
      db.tasks
        .add(data.id, data.owner, data.description)
        .then(function (response) {
          done(); // It is now guaranteed to finish before 'it' starts.
        });
    });
  });
  it('uuid has 36 characters', function () {
    return db.tasks.id().then(function (response) {
      expect(response.id.length).to.equal(36);
    }); // no catch, it'll figure it out since the promise is rejected
  });
  describe('Add tasks', function () {
    it('created task has a valid and right uuid', function () {
      return db.tasks.get(data.id, data.owner).then(function (response) {
        expect(response.id.length).to.equal(36);
        expect(response.id).to.equal(data.id);
      });
    });
    it('the created task has the right description', function () {
      return db.tasks.get(data.id, data.owner).then(function (response) {
        expect(response.id).to.equal(data.id);
        expect(response.description).to.equal(data.description);
      });
    });
    it('the created task has the right owner', function () {
      return db.tasks.get(data.id, data.owner).then(function (response) {
        expect(response.owner).to.equal(data.owner);
      });
    });
    it('the created task has timestamp close to now', function () {
      const timestamp = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000,
      ).toISOString();
      return db.tasks.get(data.id, data.owner).then(function (response) {
        expect(function (response) {
          assert.closeToTime(response.created, timestamp);
        });
      });
    });
  });
  describe('Update tasks', function () {
    beforeEach(function (done) {
      db.tasks
        .update(data.id, data.owner, 'That was a test task for unit testing.')
        .then(function (response) {
          done(); // It is now guaranteed to finish before 'it' starts.
        })
        .catch((error) => done(error));
    });
    it('the updated task has the right owner', function () {
      return db.tasks.get(data.id, data.owner).then(function (response) {
        expect(response.owner).to.equal(data.owner);
      });
    });
    it('the updated task has the right description', function () {
      return db.tasks.get(data.id, data.owner).then(function (response) {
        expect(response.description).to.equal(
          'That was a test task for unit testing.',
        );
      });
    });
    it('the updated task has timestamp close to now', function () {
      const timestamp = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000,
      ).toISOString();
      return db.tasks.get(data.id, data.owner).then(function (response) {
        expect(function (response) {
          assert.closeToTime(response.updated, timestamp);
        });
      });
    });
  });
  it('Fetch all tasks for owner responds responds with an array of tasks', function () {
    return db.tasks.fetch(data.owner).then(function (response) {
      expect(response).to.be.an('array');
    });
  });
  it('Remove an existing task expects no data to be returned', function () {
    db.tasks.remove(data.id, data.owner).then((none) => {
      return db.tasks.get(data.id, data.owner).then(function (response) {
        expect(response).to.be.an('undefined');
      });
    });
  });
});
