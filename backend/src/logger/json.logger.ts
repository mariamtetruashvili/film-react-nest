import { Injectable, LoggerService } from '@nestjs/common';

type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

interface JsonLogMessage {
  level: LogLevel;
  message: unknown;
  optionalParams: unknown[];
  timestamp: string;
}

@Injectable()
export class JsonLogger implements LoggerService {
  private formatMessage(
    level: LogLevel,
    message: unknown,
    optionalParams: unknown[],
  ): string {
    const logObject: JsonLogMessage = {
      level,
      message,
      optionalParams,
      timestamp: new Date().toISOString(),
    };

    return JSON.stringify(logObject);
  }

  log(message: unknown, ...optionalParams: unknown[]): void {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]): void {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]): void {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: unknown, ...optionalParams: unknown[]): void {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose(message: unknown, ...optionalParams: unknown[]): void {
    console.info(this.formatMessage('verbose', message, optionalParams));
  }
}
