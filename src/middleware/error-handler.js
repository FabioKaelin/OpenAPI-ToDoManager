const logger = require('../utils/logger');
const { GeneralError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  logger.log('error', err.stack);
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      code: err.getCode(),
      message: err.getUserFriendlyMessage()
    });
  }
  return res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message
  });
}

module.exports = errorHandler
