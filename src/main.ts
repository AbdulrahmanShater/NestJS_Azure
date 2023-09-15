import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EventHubService } from './event-hub/event-hub.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const eventHubService = app.get(EventHubService);
  await eventHubService.startListening();

  await app.listen(3000);
}
bootstrap();
