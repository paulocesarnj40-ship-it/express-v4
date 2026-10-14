export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserRepository {
  // Creates a new user in the repository. The user ID will be generated automatically.
  create(user: Omit<User, 'id'>): Promise<User>;
  // Finds a user by their email address. Returns null if no user is found.
  findByEmail(email: string): Promise<User | null>;
  // Retrieves all users from the repository.
  findAll(): Promise<User[]>;
  // Deletes all users from the repository.
  deleteAll(): Promise<void>;
}
