const { APIResponse } = require('../utils/response');

function healthcheck(req, res) {
  const data = {
    uptime: process.uptime(),
    date: new Date(),
  };
  const healthcheck = new APIResponse(200, "I'm available, what's up?", data);
  res.status(healthcheck.code).json(healthcheck);
}

module.exports = {
  healthcheck,
};
