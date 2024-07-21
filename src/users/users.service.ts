import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    this.logger.log(`User ${user.email} created`);
    return user;
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password.toString(), 10);
    }
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    this.logger.log(`User ${user.email} updated`);
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    this.logger.log(`User ${user.email} deleted`);
    return user;
  }
}
