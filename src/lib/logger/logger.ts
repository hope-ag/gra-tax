import { existsSync, mkdirSync } from 'fs'
import winston from 'winston'
import WinstonDaily from 'winston-daily-rotate-file'
import { LoggingWinston } from '@google-cloud/logging-winston'
import { LOGGER_ENABLED, NODE_ENV, LOG_DIR as logDir } from '@/lib/env/environment'

// logs dir

if (!existsSync(logDir)) {
  mkdirSync(logDir)
}

// Define log format
const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
)

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(winston.format.splat(), winston.format.colorize())
})
const format = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  logFormat
)

function createLogger() {
  if (NODE_ENV === 'production' && LOGGER_ENABLED) {
    const loggingWinston = new LoggingWinston()
    return winston.createLogger({
      level: 'info',
      format,
      transports: [
        consoleTransport,
        // Add Cloud Logging
        loggingWinston
      ]
    })
  } else {
    const logger = winston.createLogger({
      format,
      transports: [
        // debug log setting
        new WinstonDaily({
          level: 'debug',
          datePattern: 'YYYY-MM-DD',
          dirname: `${logDir}/debug`, // log file /logs/debug/*.log in save
          filename: `%DATE%.log`,
          maxFiles: 30, // 30 Days saved
          json: false,
          zippedArchive: true
        }),
        // error log setting
        new WinstonDaily({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: `${logDir}/error`, // log file /logs/error/*.log in save
          filename: `%DATE%.log`,
          maxFiles: 30, // 30 Days saved
          handleExceptions: true,
          json: false,
          zippedArchive: true
        })
      ]
    })
    logger.add(consoleTransport)

    return logger
  }
}

const logger = createLogger()
const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')))
  }
}

export { logger, stream }
