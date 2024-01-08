import { Client } from 'tmi.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TwitchService {
  tmiClient: Client;
  constructor() {
    this.tmiClient = new Client({
      identity: {
        username: 'roguerre',
        password: 'oauth:kzrf58wtfync79wzdkpuh5dniexaki',
      },
      channels: ['roguerre'],
    });
    this.tmiClient.on('message', () => {
      console.log('Boy, it works!');
    });
    this.tmiClient.connect();
  }
}
