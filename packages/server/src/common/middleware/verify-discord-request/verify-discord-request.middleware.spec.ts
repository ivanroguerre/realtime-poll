import { VerifyDiscordRequestMiddleware } from './verify-discord-request.middleware';

describe('VerifyDiscordRequestMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyDiscordRequestMiddleware()).toBeDefined();
  });
});
