const { APIResponse } = require('../utils/response');

function healthcheck(req, res) {
  const data = {
    date: new Date(),
    betriebszeit: process.uptime(),
  };
  const healthcheck = new APIResponse(200, "I'm available, what's up?", data);
  res.status(healthcheck.code).json(healthcheck);
}

module.exports = {
  healthcheck,
};
