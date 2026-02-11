import { LoggerService } from '@nestjs/common';

export class TskvLogger implements LoggerService {
  private format(record: Record<string, string>) {
    return (
      Object.entries(record)
        .map(([key, value]) => `${key}=${value}`)
        .join('\t') + '\n'
    );
  }

  log(message: string) {
    process.stdout.write(
      this.format({
        level: 'log',
        message,
        timestamp: new Date().toISOString(),
      }),
    );
  }

  error(message: string, trace?: string) {
    process.stderr.write(
      this.format({
        level: 'error',
        message,
        trace: trace ?? '',
        timestamp: new Date().toISOString(),
      }),
    );
  }

  warn(message: string) {
    process.stdout.write(
      this.format({
        level: 'warn',
        message,
        timestamp: new Date().toISOString(),
      }),
    );
  }

  debug(message: string) {
    process.stdout.write(
      this.format({
        level: 'debug',
        message,
        timestamp: new Date().toISOString(),
      }),
    );
  }

  verbose(message: string) {
    process.stdout.write(
      this.format({
        level: 'verbose',
        message,
        timestamp: new Date().toISOString(),
      }),
    );
  }
}
