import jwt from 'jsonwebtoken';
import { AuthUser } from '../types/express';
import { config } from '../config/env';

export function generateToken(payload: AuthUser): string {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN as any });
}

export function verifyToken(token: string): AuthUser {
  return jwt.verify(token, config.JWT_SECRET) as AuthUser;
}
