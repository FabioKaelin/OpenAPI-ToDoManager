const { APIResponse } = require('../utils/response');
const db = require('../utils/db.js'); // your db module
const logger = require('../utils/logger');

function todoid(req, res) {
  let data = {};
  let id = req.path.todoid;
  db.one("SELECT replace(gen_random_uuid()::text, '-','') AS UUID;")
    .then(function (data) {
      data = {
        UUID: data.uuid,
      };

      const todoid = new APIResponse(200, 'Get Task by ID', data);
      res.status(todoid.code).json(todoid);
    })
    .catch(function (error) {
      logger.error(error);
      let data = {};
      const todoid = new APIResponse(400, 'Unexpected Error', data);
      res.status(todoid.code).json(todoid);
    });
}

module.exports = {
  todoid,
};
