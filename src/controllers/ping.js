const { APIResponse } = require('../utils/response');

function ping (req, res) {
  const data = {
    date: new Date(),
    message: req.query.message || "pong"
  }
  const pong = new APIResponse(200, "I'm available, what's up?", data);
  res.status(pong.code).json(pong);
}

module.exports = {
  ping
}
