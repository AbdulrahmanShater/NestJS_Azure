import { Module } from '@nestjs/common';
import { EventHubService } from './event-hub.service';

@Module({
  providers: [EventHubService],
})
export class EventHubModule {}
