import jwt from 'jsonwebtoken';

type JwtPayload = Record<string, unknown>;
type Secret = string;
type Expiration = string | number;

const JWT_SECRET=process.env.JWT_SECRET || 'your-secret-key';
//const JWT_EXPIRATION: Expiration = process.env.JWT_EXPIRATION || '1h';


export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '60'});
}

export function verifyToken<T extends object | string = JwtPayload | string>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
} 
