import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EventHubModule } from './event-hub/event-hub.module';
import { ServiceBusModule } from './service-bus/service-bus.module';

@Module({
  imports: [DatabaseModule, EventHubModule, ServiceBusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
