import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        private prisma: PrismaService,
        private mailService: MailService,
        private logsService: LogsService

    ) {}

    async createUser(data: { name: string; email: string; password: string }): Promise<User> {
        const { name, email, password } = data;
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        try {
          const user = await this.prisma.user.create({
            data: {
              name: name,
              email: email,
              password: hashedPassword,
            },
          });
    
          await this.mailService.sendWelcomeEmail(user.email);
    
          this.logger.log(`User created: ${user.email}`);
    
          return user;
        } catch (error) {
          this.logger.error(`Error creating user ${email}: ${error.message}`);
          throw error;
        }
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

    await this.logsService.logActivity(`User ${user.email} updated`);

    this.logger.log(`User ${user.email} updated`);
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    await this.logsService.logActivity(`User ${user.email} deleted`);

    this.logger.log(`User ${user.email} deleted`);
    return user;
  }
}
