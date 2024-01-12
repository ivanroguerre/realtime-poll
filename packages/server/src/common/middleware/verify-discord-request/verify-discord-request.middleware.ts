import { ConfigService } from '@nestjs/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { json as bodyParserJSON } from 'body-parser';

import { verifyDiscordRequest } from 'src/common/utils';

@Injectable()
export class VerifyDiscordRequestMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    bodyParserJSON({
      verify: verifyDiscordRequest(this.configService.get('PUBLIC_KEY')),
    })(req, res, next);
  }
}
