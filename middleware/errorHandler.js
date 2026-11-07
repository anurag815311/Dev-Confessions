const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error(
    `${req.method} ${req.originalUrl} - ${err.message}`,
    err.stack
  );

  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    Number.isInteger(err.statusCode) && err.statusCode >= 400
      ? err.statusCode
      : Number.isInteger(err.status) && err.status >= 400 && err.status < 500
        ? err.status
        : 500;

  const message =
    statusCode === 500
      ? 'Internal server error'
      : err.message || 'Request failed';

  return res.status(statusCode).json({
    success: false,
    message
  });
}

module.exports = errorHandler;