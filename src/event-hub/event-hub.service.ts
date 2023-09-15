import { Injectable } from '@nestjs/common';
import { EventHubConsumerClient, EventPosition } from '@azure/event-hubs';
import { DefaultAzureCredential } from '@azure/identity';

@Injectable()
export class EventHubService {
  private consumerClient: EventHubConsumerClient;

  constructor() {
    const connectionString = process.env.AZURE_EVENT_HUB_CONNECTION_STRING;
    const eventHubName = process.env.AZURE_EVENT_HUB_Name;

    this.consumerClient = new EventHubConsumerClient(
      EventHubConsumerClient.defaultConsumerGroupName,
      connectionString,
      eventHubName,
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
}
