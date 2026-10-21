import { Request, Response } from 'express';
import { UserService } from '@services/UserService';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id?: string;
        name?: string;
        username?: string;
      };
    }
  }
}
// Controller para autenticação de usuários
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
    res
      .status(200)
      .json({ msg: 'Perfil do usuário autenticado', user: req.user });
  }

  // Rota para logout do usuário
  async logout(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization?.split(' ')[1];

    await this.authService.executeLogout(req.user?.id, token);

    return res.status(200).json({ message: 'Usuário deslogado com sucesso.' });
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
