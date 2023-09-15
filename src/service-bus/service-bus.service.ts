import { Injectable } from '@nestjs/common';
import { ServiceBusClient } from '@azure/service-bus';

@Injectable()
export class ServiceBusService {
  private serviceBusClient: ServiceBusClient;

  constructor() {
    this.serviceBusClient = new ServiceBusClient(
      process.env.AZURE_SERVICE_BUS_CONNECTION_STRING,
    );
  }

  async sendMessageToQueue(queueName: string, message: any): Promise<void> {
    const sender = this.serviceBusClient.createSender(queueName);
    await sender.sendMessages({ body: message });
    await sender.close();
  }
}
