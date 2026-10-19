import jwt, { type SignOptions } from 'jsonwebtoken';

type JwtPayload = Record<string, unknown>;
type Expiration = SignOptions['expiresIn'];

// Função auxiliar para garantir que a chave secreta existe e é única
const getSecretKey = (): string => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not configured in environment variables');
  }
  
  return secret;
};

export function generateToken(payload: JwtPayload): string {
  const secret = getSecretKey();
  const expiration: Expiration = (process.env.JWT_EXPIRATION as Expiration | undefined) || '1h';
  
  return jwt.sign(payload, secret, { expiresIn: expiration });
}

export function verifyToken<T extends object | string = JwtPayload | string>(token: string): T {
  const secret = getSecretKey();
  
  return jwt.verify(token, secret) as T;
}