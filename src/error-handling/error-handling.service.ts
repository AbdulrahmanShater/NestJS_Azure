import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ErrorHandlingService {
  private readonly logger = new Logger(ErrorHandlingService.name);

  handle(error: Error): void {
    this.logger.error(error.message, error.stack);
  }
}
