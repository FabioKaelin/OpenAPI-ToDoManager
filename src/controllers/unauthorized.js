const { APIResponse } = require('../utils/response');

function unauthorized(req, res) {
  const data = {};
  const unauthorized = new APIResponse(401, 'You are not authorized', data);
  res.status(unauthorized.code).json(unauthorized);
}

module.exports = {
  unauthorized,
};
