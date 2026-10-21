import { AuthController } from '@controllers/AuthController';
import { authMiddleware } from '@middlewares/authMiddlewar';
import { validate } from '@middlewares/validate';
import { UserRepository } from '@repositories/UserRepository';
import { createUserSchema, loginUserSchema } from '@schema/createUserSchema';
import { UserService } from '@services/UserService';
import { Router } from 'express';

export function createUserRouter(): Router {
  const router = Router();

  // 1. Instanciação do repositório concreto
  const userRepository = new UserRepository();

  // 2. Injeção do repositório no serviço
  const userService = new UserService(userRepository);

  // 3. Injeção do serviço no controller
  const userController = new AuthController(userService);

  // 4. Definição das rotas com a preservação do escopo 'this'

  // Rota para criar um usuário
  router.post('/', validate(createUserSchema), (req, res) =>
    userController.register(req, res),
  );

  // Rota para deletar todos os usuários
  //router.delete('/', (req, res) => userController.handleDeleteAll(req, res));

  // Rota para login do usuário
  router.post('/login', validate(loginUserSchema), (req, res) =>
    userController.login(req, res),
  );

  // Rota privada para obter informações do usuário logado
  router.get('/profile', authMiddleware, (req, res) =>
    userController.profile(req, res),
  );

  router.post('/logout', authMiddleware, (req, res) =>
    userController.logout(req, res),
  );
  
  router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
  });

  return router;
}