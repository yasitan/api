import jwt from 'jsonwebtoken'
import { getEnv } from './system';

interface JwtSigningData {
  id: string;
  payload: Record<string, unknown>;
}

export const signToken = (userData: JwtSigningData) =>
  jwt.sign(userData.payload, getEnv('JWT_SECRET'), {
    expiresIn: getEnv('JWT_TOKEN_LIFETIME_SECONDS') + 's',
    subject: userData.id,
    issuer: getEnv('JWT_ISSUER')
  });


export const verifyToken = (token: string) => new Promise((resolve, reject) => {
  jwt.verify(token, getEnv('JWT_SECRET'), (err) => {
    if (err) {
      return reject(err);
    }
    resolve(undefined);
  });
});
