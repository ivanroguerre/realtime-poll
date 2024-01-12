import { Request, Response } from 'express';
import { verifyKey } from 'discord-interactions';

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
