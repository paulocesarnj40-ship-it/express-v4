import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {generateToken,verifyToken } from '../config/auth';

interface DecodedToken {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

export async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization; // Garante a busca correta do header
console.log('Auth header:', authHeader);
  // 1. Verifica se o header existe e começa com "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Token não fornecido ou mal formatado');
    return res.status(401).json({ error: 'Token não fornecido ou mal formatado' });
  }

  // 2. Divide o header e extrai apenas a string do token
  const parts = authHeader.split(' ');
  const { token} = { token: parts[1] };
console.log('Token extraído:', token);
  // 3. Valida se o token realmente existe (evita string vazia)
  if (!token) {
    console.log('Token string deu ruim ou está vazia');
    return res.status(401).json({ error: 'Token string está vazia deu problema' });
  }

  try {
    // 4. Verifica o token
    const decoded = verifyToken<DecodedToken>(token);
    console.log('Token decodificado:', decoded);
    // Opcional: Salva os dados do token na requisição para usar nos controllers
    // req.user = decoded; 

    return next();
  } catch (error) {
    console.log('Erro ao verificar token:', error);
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}
