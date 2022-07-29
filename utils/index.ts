/* eslint-disable @typescript-eslint/no-var-requires */
const nacl = require('tweetnacl');
const { createHash } = require('crypto');
import { utils } from 'near-api-js';
import Resizer from 'react-image-file-resizer';

export const isEnvProd = process.env.NODE_ENV == 'production';

// SHA-256 hash
export const hash = (msg: string) => {
  return createHash('sha256').update(msg).digest('hex');
};

export const amountInYocto = (amount: string) => utils.format.parseNearAmount(amount);
export const amountInNEAR = (amount: string) => utils.format.formatNearAmount(amount);

export const getRandomHashString = (): string => {
  const randomBytes = nacl.randomBytes(64);
  return Array.from(randomBytes, function (byte: number) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

export const formatTimeStampToLocaleDateString = (timestamp: number) => {
  return new Date(timestamp / 1000000).toLocaleDateString();
};

export const formatTimeStampToLocaleTimeString = (timestamp: number) => {
  return new Date(timestamp / 1000000).toLocaleTimeString();
};

export const resizeFile = (file: File): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      450,
      450,
      'PNG',
      100,
      0,
      (uri: any) => {
        resolve(uri);
      },
      'file',
      450,
      450
    );
  });

export const getCoords = async () => {
  try {
    const pos: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      long: pos.coords.longitude,
      lat: pos.coords.latitude,
    };
  } catch (err) {
    return null;
  }
};
