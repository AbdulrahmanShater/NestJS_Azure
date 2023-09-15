import { Injectable } from '@nestjs/common';
import {
  ServiceBusClient,
  ServiceBusReceiver,
  ServiceBusReceivedMessage,
} from '@azure/service-bus';
import { MessageService } from '../database/message.service';
import { Message } from 'src/database/message.model';

@Injectable()
export class ServiceBusListenerService {
  private serviceBusClient: ServiceBusClient;

  constructor(private readonly messageService: MessageService) {
    const connectionString = process.env.AZURE_SERVICE_BUS_CONNECTION_STRING;

    this.serviceBusClient = new ServiceBusClient(connectionString);
  }

  async startListening(queueName: string): Promise<void> {
    const receiver = this.serviceBusClient.createReceiver(queueName, {
      receiveMode: 'peekLock', // Use 'peekLock' for message handling
    });

    receiver.subscribe({
      processMessage: async (message: ServiceBusReceivedMessage) => {
        // Process the message
        const content: Message = message.body;

        // Store in MongoDB
        await this.messageService.create(content);

        // Complete the message
        await receiver.completeMessage(message);
      },
      processError: async (err) => {
        console.error(err);
      },
    });
  }
}
