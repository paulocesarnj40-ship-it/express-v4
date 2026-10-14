import jwt from 'jsonwebtoken';
import { IUserRepository, User } from '@repositories/IUserRepository';
import { hashPassword, comparePassword } from '@utils/passwordService';

type AuthenticatedUser = User & { token: string };

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
  ): Promise<AuthenticatedUser> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      console.log('User not found');
      throw new Error('User not found');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'default_secret',
      {
        expiresIn: '1h',
      },
    );
    console.log('User logged in:', user, token);
    return { ...user, token: token };
  }

  //async executeDeleteAllUsers(): Promise<void> {
  // await this.userRepository.deleteAll();
  // console.log('All users deleted');
  //}

  async executeFindAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    console.log('All users:', users);
    return users;
  }
}
