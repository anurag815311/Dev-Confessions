function log(level, message, details = '') {
  const timestamp = new Date().toISOString();

  console[level](
    `[${timestamp}] [${level.toUpperCase()}] ${message}`,
    details
  );
}

module.exports = {
  info: (message, details) => log('info', message, details),
  warn: (message, details) => log('warn', message, details),
  error: (message, details) => log('error', message, details)
};