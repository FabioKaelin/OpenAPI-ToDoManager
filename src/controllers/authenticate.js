const { verifyCredentials } = require('../middleware/auth-handler');
const { APIResponse } = require('../utils/response');

const authenticate = function (req, res, next) {
  return verifyCredentials(req, res, () => {
    if (req.token && req.email) {
      const data = { id: req.id, email: req.email, token: req.token };
      const pong = new APIResponse(200, 'JWT Verification succeeded', data);
      return res.status(pong.code).json(pong);
    }
  });
};

module.exports = {
  authenticate,
};
