import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'lucas',
      password: 'lucas',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'maria',
    },
  ];

  async findOne(username: string, userId: number): Promise<User | undefined> {
    console.log('USERS', username, userId);
    return this.users.find(
      (user) => user.username === username || user.userId === userId,
    );
  }
}
