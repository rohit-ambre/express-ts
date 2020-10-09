import winston = require('winston');

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] - ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  exitOnError: false,
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      maxsize: 1024 * 1024 * 10 // 10MB
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      maxsize: 1024 * 1024 * 10 // 10MB
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        myFormat
      )
    })
  ]
});

export default logger;
