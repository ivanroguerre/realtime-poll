import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { TwitchModule } from './twitch/twitch.module';

@Module({
  imports: [EventsModule, TwitchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
