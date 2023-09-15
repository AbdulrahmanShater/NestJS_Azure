import { Injectable } from '@nestjs/common';
import { EventHubConsumerClient, EventPosition } from '@azure/event-hubs';
import { DefaultAzureCredential } from '@azure/identity';
import { ServiceBusService } from 'src/service-bus/service-bus.service';

@Injectable()
export class EventHubService {
  private consumerClient: EventHubConsumerClient;

  constructor(private readonly serviceBusService: ServiceBusService) {
    this.consumerClient = new EventHubConsumerClient(
      EventHubConsumerClient.defaultConsumerGroupName,
      process.env.AZURE_EVENT_HUB_CONNECTION_STRING,
      process.env.AZURE_EVENT_HUB_Name,
      new DefaultAzureCredential(),
    );
  }

  async startListening(): Promise<void> {
    const partitionIds = await this.consumerClient.getPartitionIds();

    partitionIds.forEach((partitionId) => {
      this.consumerClient.subscribe(partitionId, {
        processEvents: async (events, context) => {
          for (const event of events) {
            console.log(event.body.toString());
          }
        },
        processError: async (err, context) => {
          console.error(err);
        },
      });
    });
  }
  async processMessage(eventData): Promise<void> {
    await this.serviceBusService.sendMessageToQueue(
      process.env.QUEUE_NAME,
      eventData.body,
    );
  }
}
