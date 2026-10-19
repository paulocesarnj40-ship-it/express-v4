import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../config/auth';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  // 1. Verifica se o header existe e começa com "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido ou mal formatado' });
  }

  // 2. Extração simplificada e limpa
  const [, token] = authHeader.split(' ');

  // 3. Valida se o token realmente existe após o split
  if (!token) {
    return res.status(401).json({ error: 'Token string está vazia' });
  }

  try {
    // 4. Verifica o token e anexa no request para uso posterior nos controllers
    const decoded = verifyToken(token);
    if (typeof decoded === 'string') {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    req.user = {
      id: typeof decoded.id === 'string' ? decoded.id : undefined,
      name: typeof decoded.name === 'string' ? decoded.name : undefined,
      username: typeof decoded.username === 'string' ? decoded.username : undefined,
    };

    return next();
  } catch (error) {
    //console.error('Token inválido ou expirado:', error);
    //return res.status(401).json({ error: 'Token inválido ou expirado' });
    console.log(token, 'Token inválido ou expirado:', error);
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}