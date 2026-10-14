import { IUserRepository, User } from '@repositories/IUserRepository';
import { prisma } from '@lib/prisma';

export class UserRepository implements IUserRepository {
  async create(userData: Omit<User, 'id'>): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
    });

    return { ...user, id: String(user.id), name: user.name ?? userData.name };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user
      ? { ...user, id: String(user.id), name: user.name ?? '' }
      : null;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map((user) => ({
      ...user,
      id: String(user.id),
      name: user.name ?? '',
    }));
  }

  async deleteAll(): Promise<void> {
    await prisma.user.deleteMany();
  }
}
