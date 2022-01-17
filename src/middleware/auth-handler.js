const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const db = require('../utils/db');
const { Unauthorized, Forbidden } = require('../utils/errors');

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}

const isLoggedIn = (req, res, next) => {
  if (req.token) {
    // user is authenticated
    next();
  } else {
    // return unauthorized
    const err = new Unauthorized('Unauthorized');
    return res.status(err.getCode()).json({
      code: err.getCode(),
      message: err.getUserFriendlyMessage(),
    });
  }
};

// grab authentication token from req header
const grabAuthenticationToken = (req, res, next) => {
  const headers = req.headers['authorization'];
  if (typeof headers !== 'undefined') {
    const bearer = headers.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    // If header is undefined return Forbidden (403)
    const err = new Forbidden('Forbidden');
    logger.error('Missing authorization token' + err);
    // return next(err);
    return res.status(err.getCode()).json({
      code: err.getCode(),
      message: err.getUserFriendlyMessage(),
    });
  }
};

const verifyToken = (req, res, next) => {
  grabAuthenticationToken(req, res, () => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        logger.log('warn', 'JWT Verification failed! Cause: ' + err);
        err = new Unauthorized('Unauthorized Error');
        return res.status(err.getCode()).json({
          code: err.getCode(),
          message: err.getUserFriendlyMessage(),
        });
      } else {
        logger.log('info', 'JWT Verification succeeded!');
        req.email = decoded;
        next();
      }
    });
  });
};

const verifyCredentials = (req, res, next) => {
  // return (req, res, next) => {
  return db.users
    .verify(req.body.email, req.body.password)
    .then((response) => {
      console.log(response);
      if (response !== null && response.email === req.body.email) {
        // generate a JWT token for the user with a secret key
        let userToken = generateAccessToken(response.email);
        req.token = userToken;
        req.id = response.id;
        req.email = response.email;
        next();
      } else {
        // Invalid credentials
        const err = new Unauthorized('Unauthorized');
        logger.log('error', err || 'Unauthorized');
        return res.status(err.getCode()).json({
          code: err.getCode(),
          message: err.getUserFriendlyMessage(),
        });
      }
    })
    .catch((error) => {
      logger.log('error', error.message || error);
      err = new Forbidden('Forbidden Error');
      err.message = error.message || error;
      return res.status(err.getCode()).json({
        code: err.getCode(),
        message: err.getUserFriendlyMessage(),
      });
    });
  // }
};

module.exports = {
  generateAccessToken,
  verifyCredentials,
  verifyToken,
};
