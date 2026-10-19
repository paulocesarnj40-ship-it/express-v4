import { generateToken } from '@config/auth';
import { IUserRepository, User } from '@repositories/IUserRepository';
import { comparePassword, hashPassword } from '@utils/passwordService';

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
  async executeLogin(
    email: string,
    password: string,
  ): Promise<any> { // Substitua 'any' pela interface correta do seu retorno (ex: AuthenticatedUser)
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

    const { password: _password, ...authenticatedUser } = user;
    return { ...authenticatedUser, token };
  }



  async executeFindAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    console.log('All users:', users);
    return users;
  }
}

