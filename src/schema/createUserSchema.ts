import { z } from 'zod';

// Schema para criação de usuário
const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, { message: 'O nome deve ter pelo menos 2 caracteres' })
      .max(100, { message: 'O nome deve ter no máximo 100 caracteres' }),

    email: z.email({ message: 'Informe um endereço de email válido' }),

    password: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\W_]{8,}$/, {
        message:
          'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número',
      }),
  }),
});

// Schema para login de usuário
const loginUserSchema = z.object({
  body: z.object({
    email: z.email({ message: 'Informe um endereço de email válido' }),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
  }),
});

export { createUserSchema, loginUserSchema };
