import { Router } from 'express';
import { validate } from '@middlewares/validate';
import { createUserSchema, loginUserSchema } from '@schema/createUserSchema';
import { UserRepository } from '@repositories/UserRepository';
import { UserService } from '@services/UserService';
import { AuthController } from '@controllers/AuthController';
import { verifyJWT } from '@middlewares/authMiddlewar';

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
  router.get('/profile', verifyJWT, (req, res) =>
    userController.profile(req, res),
     );

  return router;
}
