const express = require('express');
const path = require('path');
const logger = require('./utils/logger');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./utils/db'); // your db module
// const pgp = db.$config.pgp; // the library's root after initialization
const OpenApiValidator = require('express-openapi-validator');

const errorHandler = require('./middleware/error-handler');
const { NotFound } = require('./utils/errors');

require('dotenv').config();

const OpenApiFile = path.join(__dirname, process.env.API_SPEC);

const app = express();
app.use(cors());
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const logFormat =
  ':method :url :status :res[content-length] - :response-time ms';
app.use(morgan(logFormat, { stream: logger.stream }));

// Add the openapi validator middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec: OpenApiFile,
    validateRequests: true, // (default)
    validateResponses: true, // <-- to validate responses
    validateApiSpec: true, // <-- to validate the open api specification
    // Don't want to manually map the OpenAPI endpoints to Express handler functions
    operationHandlers: path.join(__dirname, './controllers'),
  }),
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new NotFound("Sorry can't find that!"));
});

app.use(errorHandler);

// Run the server
app.listen(process.env.API_PORT, () => {
  logger.info(
    'Server started and running on http://%s:%d',
    process.env.API_HOST,
    process.env.API_PORT,
  );
});

module.exports = app;
