import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);

  log(message: string): void {
    this.logger.log(message);
  }

  error(message: string, trace: string): void {
    this.logger.error(message, trace);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
