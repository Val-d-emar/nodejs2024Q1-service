import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { Console } from 'node:console';
import * as fs from 'node:fs';
import * as path from 'node:path';

const levels: LogLevel[] = [
  'log',
  'error',
  'warn',
  'debug',
  'verbose',
  'fatal',
];

@Injectable()
export class LoggingService extends ConsoleLogger {
  /**
   * Write a 'log' level log.
   */
  private console: Console;
  constructor(context?: string) {
    super(context);
    if (process.env.LOG_LEVEL) {
      const level = parseInt(process.env.LOG_LEVEL) || 3;
      this.setLogLevels(levels.slice(0, level));
    }
    if (process.env.LOG_TO_FILE === 'true') {
      const log_path = process.env.LOG_FILE_PATH || '/var/log';
      const app_name = process.env.APP_NAME || 'app';
      const logFile = path.join(log_path, `${app_name}_warn.log`);
      const errFile = path.join(log_path, `${app_name}_err.log`);
      const maxSize = parseInt(process.env.LOG_FILE_MAX_SIZE_KB) || 1024;
      // Rotation
      try {
        const { size: logSize } = fs.statSync(logFile);
        if (logSize / 1024 > maxSize) {
          fs.renameSync(logFile, `${logFile}.${Date.now()}`);
        }
        const { size: errSize } = fs.statSync(errFile);
        if (errSize / 1024 > maxSize) {
          fs.renameSync(errFile, `${errFile}.${Date.now()}`);
        }
      } catch {
        // File doesn't exists
      }
      const output = fs.createWriteStream(logFile);
      const errorOutput = fs.createWriteStream(errFile);
      // Custom simple logger
      this.console = new Console({ stdout: output, stderr: errorOutput });
    } else {
      const output = fs.createWriteStream('/dev/null');
      this.console = new Console({ stdout: output, stderr: output });
    }
  }

  log(message: any, ...optionalParams: any[]) {
    // this.logger.log(message, ...optionalParams);
    super.log(message, ...optionalParams);
    this.console.log(
      new Date().toISOString().replace(/T/, ' ').replace(/Z/, ' '),
      message,
      ...optionalParams,
    );
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParams: any[]) {
    super.fatal(message, ...optionalParams);
    this.console.log(
      new Date().toISOString().replace(/T/, ' ').replace(/Z/, ' '),
      message,
      ...optionalParams,
    );
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    super.error(message, ...optionalParams);
    this.console.log(
      new Date().toISOString().replace(/T/, ' ').replace(/Z/, ' '),
      message,
      ...optionalParams,
    );
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
    this.console.log(
      new Date().toISOString().replace(/T/, ' ').replace(/Z/, ' '),
      message,
      ...optionalParams,
    );
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    super.debug(message, ...optionalParams);
    this.console.log(
      new Date().toISOString().replace(/T/, ' ').replace(/Z/, ' '),
      message,
      ...optionalParams,
    );
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message, ...optionalParams);
    this.console.log(
      new Date().toISOString().replace(/T/, ' ').replace(/Z/, ' '),
      message,
      ...optionalParams,
    );
  }
}
