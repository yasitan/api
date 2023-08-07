import jwt from 'jsonwebtoken'
import { getEnv } from './system';

interface JwtSigningData {
  id: string;
  payload: Record<string, unknown>;
}

export const signJwt = (userData: JwtSigningData) =>
  jwt.sign(userData.payload, getEnv('JWT_SECRET'), {
    expiresIn: getEnv('JWT_TOKEN_LIFETIME_SECONDS') + 's',
    subject: userData.id,
    issuer: getEnv('JWT_ISSUER')
  });
