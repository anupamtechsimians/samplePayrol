const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Set the log level
  format: winston.format.simple(), // Set the log format
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'logs.log' }), // Log to a file
  ],
});
module.exports = logger;

