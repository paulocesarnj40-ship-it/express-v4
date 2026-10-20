import { HelmetOptions } from 'helmet';

/**
 * Configuração personalizada e segura para o Helmet em projetos TypeScript/Express.
 * O Helmet gerencia múltiplos cabeçalhos HTTP de segurança para proteger a API.
 */
export const helmetOptions: HelmetOptions = {
  // Configuração da Content Security Policy (CSP)
  // Caso sua API sirva apenas JSON para um front-end separado, você pode ajustar ou manter os padrões.
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Permite estilos inline se necessário
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },

  // Proteção contra Clickjacking: impede que seu site seja aberto dentro de iframes externos
  crossOriginResourcePolicy: { policy: "cross-origin" },
  
  // Força o navegador a usar HTTPS estrito em produção (HSTS)
  strictTransportSecurity: {
    maxAge: 31536000, // 1 ano em segundos
    includeSubDomains: true,
    preload: true,
  },
};