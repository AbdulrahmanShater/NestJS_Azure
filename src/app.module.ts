import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EventHubModule } from './event-hub/event-hub.module';

@Module({
  imports: [DatabaseModule, EventHubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
