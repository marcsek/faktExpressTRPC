import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const accessPublicKey = Buffer.from(process.env.ACCESS_PUBLIC_KEY ?? '', 'base64').toString('ascii');
const accessPrivateKey = Buffer.from(process.env.ACCESS_PRIVATE_KEY ?? '', 'base64').toString('ascii');

const refreshPublicKey = Buffer.from(process.env.REFRESH_PUBLIC_KEY ?? '', 'base64').toString('ascii');
const refreshPrivateKey = Buffer.from(process.env.REFRESH_PRIVATE_KEY ?? '', 'base64').toString('ascii');

export function signJwt(object: Object, key: string, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, key, {
    ...options,
    algorithm: 'RS256',
  });
}

export function verifyJwt<T>(token: string, key: string): T | null {
  return jwt.verify(token, key) as T;
}

export const createAccessToken = (object: Object, options?: jwt.SignOptions | undefined) => {
  return signJwt(object, accessPrivateKey, options);
};

export const createRefreshToken = (object: Object, options?: jwt.SignOptions | undefined) => {
  return signJwt(object, refreshPrivateKey, options);
};

export const verifyAccessToken = <T>(token: string): T | null => {
  return verifyJwt<T>(token, accessPublicKey);
};

export const verifyRefreshToken = <T>(token: string): T | null => {
  return verifyJwt<T>(token, refreshPublicKey);
};
