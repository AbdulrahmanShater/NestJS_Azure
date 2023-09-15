import { Injectable } from '@nestjs/common';
import {
  ServiceBusClient,
  ServiceBusReceiver,
  ServiceBusReceivedMessage,
} from '@azure/service-bus';
import { MessageService } from '../database/message.service';
import { Message } from 'src/database/message.model';
import { ErrorHandlingService } from 'src/error-handling/error-handling.service';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class ServiceBusListenerService {
  private serviceBusClient: ServiceBusClient;

  constructor(
    private readonly messageService: MessageService,
    private readonly errorHandlingService: ErrorHandlingService,
    private readonly loggingService: LoggingService,
  ) {
    this.serviceBusClient = new ServiceBusClient(
      process.env.AZURE_SERVICE_BUS_CONNECTION_STRING,
    );
  }

  async startListening(queueName: string): Promise<void> {
    const receiver = this.serviceBusClient.createReceiver(queueName, {
      receiveMode: 'peekLock', // Use 'peekLock' for message handling
    });

    receiver.subscribe({
      processMessage: async (message: ServiceBusReceivedMessage) => {
        const content: Message = message.body;

        await this.messageService.create(content);

        await receiver.completeMessage(message);
      },
      processError: async (err) => {
        this.errorHandlingService.handle(err.error);
      },
    });
  }
}
