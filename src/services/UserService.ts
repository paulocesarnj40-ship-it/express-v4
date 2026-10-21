import { generateToken } from '@config/auth';
import { IUserRepository, User } from '@repositories/IUserRepository';
import { comparePassword, hashPassword } from '@utils/passwordService';
import { tokenBlacklist } from '@utils/TokenBlacklist';

type AuthenticatedUser = Omit<User, 'password'> & { token: string };

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  // Rota para registrar um novo usuário
  async executeRegister(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new Error('User already exists');
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log('User created:', newUser);
    return newUser;
  }

  // Rota para login do usuário
  async executeLogin(email: string, password: string): Promise<AuthenticatedUser> {
    // Substitua 'any' pela interface correta do seu retorno (ex: AuthenticatedUser)
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Payload enxuto e seguro (nunca coloque senha aqui!)
    const payload = { id: user.id, email: user.email };
    const token = generateToken(payload);

    const {  ...authenticatedUser } = user;
    return { ...authenticatedUser, token };
  }

  async executeFindAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    console.log('All users:', users);
    return users;
  }

  //rota para logout do usuário
  async executeLogout(userId: string | undefined, token: string | undefined): Promise<void> {
    // 1. Validação do ID do usuário trazido pelo middleware
    if (!userId) {
      throw new Error('Usuário não autenticado.');
    }

    // 2. Validação da presença do token
    if (!token) {
      throw new Error('Token não fornecido para logout.');
    }

    // 3. Adiciona o token à blacklist para invalidá-lo ativamente
    tokenBlacklist.add(token);

    console.log(`[Logout] Token revogado para o usuário ID: ${userId}`);
  }

  //rota para recuperar senha do usuário
  async executeForgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    // Implement forgot password logic here, e.g., send reset email
    console.log(`Password reset link sent to ${email}`);
  }
  
  //rota para resetar senha do usuário
  async executeResetPassword(userId: string, newPassword: string): Promise<void> {
    const hashedPassword = await hashPassword(newPassword);
    // Implement reset password logic here, e.g., update user password in DB
    console.log(`Password for user with ID ${userId} has been reset`);
  } 
}
