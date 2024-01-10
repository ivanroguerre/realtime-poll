import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { PollModule } from 'src/poll/poll.module';

@Module({
  imports: [PollModule],
  providers: [EventsGateway],
})
export class EventsModule {}
