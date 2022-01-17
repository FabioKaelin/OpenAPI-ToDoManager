const logger = require('./logger');
const Users = require('../models/users');

const initOptions = {
  extend(obj, dc) {
    obj.users = new Users(obj, pgp);
  },
  query(e) {
    logger.log('info', e.query);
  },
  error: (err, e) => {
    // The error applies to the result from the following methods: none, one, oneOrNone and many.
    if (err instanceof pgp.errors.QueryResultError) {
      logger.error('%s: %s. Query: %s.', err.name, err.message, err.query);
    }
  },
};

const pgp = require('pg-promise')(initOptions);

const cn = {
  host: '172.19.0.2',
  port: 5432,
  database: 'm295',
  user: 'admin',
  password: 'secret-pwd',
};

// creates the object, but it does not try to connect
const db = pgp(/* process.env.DATABASE_CONNECTOR */ cn);

// Test the connection and log Postgres server version
// if successful; or else log connection error
db.connect()
  .then((obj) => {
    const serverVersion = obj.client.serverVersion;
    logger.log('info', 'Database server version: ' + serverVersion);
    obj.done(); // success, release the connection;
  })
  .catch((error) => {
    logger.log('error', error.message || error);
  });

module.exports = db;
