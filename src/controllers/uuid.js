const { APIResponse } = require('../utils/response');
const db = require('../utils/db.js'); // your db module
const logger = require('../utils/logger');

function uuid(req, res) {
  let data = {};
  db.one("SELECT replace(gen_random_uuid()::text, '-','') AS UUID;")
    .then(function (data) {
      data = {
        UUID: data.uuid,
      };

      const uuid = new APIResponse(200, 'A random UUID', data);
      res.status(uuid.code).json(uuid);
    })
    .catch(function (error) {
      logger.error(error);
      let data = {};
      const uuid = new APIResponse(400, 'Unexpected Error', data);
      res.status(uuid.code).json(uuid);
    });
}

module.exports = {
  uuid,
};
