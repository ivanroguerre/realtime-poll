import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule } from './discord/discord.module';
import { EventsModule } from './events/events.module';
import { PollModule } from './poll/poll.module';
import { VerifyDiscordRequestMiddleware } from './common/middleware/verify-discord-request/verify-discord-request.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DiscordModule,
    EventsModule,
    PollModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyDiscordRequestMiddleware)
      .forRoutes({ path: 'discord/interactions', method: RequestMethod.POST });
  }
}
