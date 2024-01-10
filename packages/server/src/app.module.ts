import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { PollModule } from './poll/poll.module';

@Module({
  imports: [EventsModule, PollModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
