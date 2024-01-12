import { Request, Response } from 'express';
import { verifyKey } from 'discord-interactions';

import { Command } from './types';

export const verifyDiscordRequest = (clientKey: string) => {
  const verifyFunction = (
    req: Request,
    res: Response,
    buf: string | Buffer | Uint8Array | ArrayBuffer,
  ) => {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send('Bad request signature');
      throw new Error('Bad request signature');
    }
  };
  return verifyFunction;
};

export const discordRequest = async (
  baseURL: string,
  endpoint: string,
  options: any,
  botToken: string,
) => {
  const url = baseURL + endpoint;
  console.log(url);
  if (options.body !== undefined) options.body = JSON.stringify(options.body);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${botToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent':
        'DiscordBot (https://github.com/ivanroguerre/realtime-poll, 1.0.0)',
    },
    ...options,
  });
  if (!res.ok) {
    throw new Error(JSON.stringify(res.json()));
  }
  return res;
};

export const installGlobalCommands = async (
  appId: string,
  baseURL: string,
  botToken: string,
  commands: Command[],
) => {
  const endpoint = `applications/${appId}/commands`;
  try {
    await discordRequest(
      baseURL,
      endpoint,
      { method: 'PUT', body: commands },
      botToken,
    );
  } catch (err) {
    console.error(err);
  }
};
