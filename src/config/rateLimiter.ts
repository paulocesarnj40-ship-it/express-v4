import { rateLimit } from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit:100,// Limite de 100 requisições por IP
  message: { 
    status: 429, // Status HTTP para "Too Many Requests"
    error: 'Muitas requisições feitas a partir deste IP, por favor tente novamente mais tarde.'
 },
  standardHeaders: true, // Retorna informações de limite de taxa nos cabeçalhos `RateLimit-*`
  legacyHeaders: false, // Desativa os cabeçalhos `X-RateLimit-*`
});