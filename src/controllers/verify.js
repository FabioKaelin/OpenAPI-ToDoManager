const { verifyToken } = require('../middleware/auth-handler');
const { APIResponse } = require('../utils/response');

const verify = function (req, res, next) {
  return verifyToken(req, res, () => {
    if (req.token && req.email) {
      const data = { email: req.email, token: req.token };
      const pong = new APIResponse(200, 'JWT Verification succeeded', data);
      return res.status(pong.code).json(pong);
    }
  });
};

module.exports = {
  verify,
};
