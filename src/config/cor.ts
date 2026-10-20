import { CorsOptions } from 'cors';

const allowedOrigins = ['http://localhost:3000', 'https://example.com'];

// Configuração de CORS para permitir apenas origens específicas
export const corOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Permite requisições sem origin (como Postman ou curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
        //console.log('Requisição bloqueada por CORS. Origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },

  // Métodos permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],

  // Cabeçalhos permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],

  // Permite credenciais (cookies, headers de autorização, etc.)    
  credentials: true,

  // Configurações adicionais
  preflightContinue: false,

  // Status de sucesso para requisições OPTIONS
  optionsSuccessStatus: 204,
};
