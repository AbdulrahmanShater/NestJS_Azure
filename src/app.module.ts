import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
<<<<<<< HEAD
import { EventHubModule } from './event-hub/event-hub.module';
import { ServiceBusModule } from './service-bus/service-bus.module';
import { ServiceBusListenerService } from './service-bus/service-bus-listener.service';

@Module({
  imports: [DatabaseModule, EventHubModule, ServiceBusModule],
=======

@Module({
  imports: [DatabaseModule],
>>>>>>> 92f583607404297343a0207fde3986bd36b561cf
  controllers: [AppController],
  providers: [AppService, ServiceBusListenerService],
})
export class AppModule {}
