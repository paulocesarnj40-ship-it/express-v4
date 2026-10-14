import { Request, Response } from 'express';
import { UserService } from '@services/UserService';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name?: string;
        username?: string;
      };
    }
  }
}

export class AuthController {
  constructor(private authService: UserService) {}

  // Rota para criar um usuário
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await this.authService.executeRegister(name, email, password);
    res.status(201).json(user);
  }

  // Rota para deletar todos os usuários
  //async handleDeleteAll(req: Request, res: Response) {
  //await this.authService.executeDeleteAllUsers();
  // console.log('All users deleted');
  // res.status(204).send();
  //}

  // Rota para login do usuário
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.authService.executeLogin(email, password);
    res.status(200).json(user);
  }

  // Rota para obter o perfil do usuário autenticado
  async profile(req: Request, res: Response) {
  // 1. Primeiro você extrai o usuário da requisição
  const user = req.user as {
    id: string;
    name?: string;
    username?: string;
  } | undefined; // Adicionado 'undefined' para o caso de não estar autenticado

  // 2. Depois você faz a validação
  if (!user) {
    return res.status(401).json({ error: 'Usuário não autenticado.' });
  }

  // 3. Agora você pode usar as propriedades com segurança
  const name = user.name ?? user.username ?? 'Usuário';
  console.log('cliente autenticado:', user.id, name);
  return res.status(200).json({ id: user.id, name }).send('Perfil do usuário autenticado');
}


  // Rota para logout do usuário
  async logout(req: Request, res: Response) {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    // Implement logout logic here, e.g., invalidate JWT token
    res.status(200).json({ message: 'Usuário deslogado com sucesso.' });
  }

  // Rota para solicitar redefinição de senha
  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    // Implement forgot password logic here, e.g., send reset password email
    res.status(200).json({
      message:
        'Instruções para redefinir a senha foram enviadas para o email fornecido.',
    });
  }

  // Rota para redefinir a senha
  async resetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body;

    // Implement reset password logic here, e.g., verify token and update password
    res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  }
}
