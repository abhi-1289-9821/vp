import jwt from 'jsonwebtoken';
import { AuthUser } from '../types/express';

const JWT_SECRET = process.env.JWT_SECRET || 'sahaay_jwt_secret_key_super_secure_demo_2026_xyz';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as any;

export function generateToken(payload: AuthUser): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): AuthUser {
  return jwt.verify(token, JWT_SECRET) as AuthUser;
}
