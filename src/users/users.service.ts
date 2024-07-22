import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { LogsService } from 'src/logs/logs.service';
import { ApiOperation } from '@nestjs/swagger';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        private prisma: PrismaService,
        private mailService: MailService,
        private logsService: LogsService

    ) {}
    /**
     * Creates a new user with the given data.
     * @param data The data for the new user.
     * @returns The created user.
     */
    @ApiOperation({ summary: 'Create user' })
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
          await this.logsService.logActivity(`User ${user.email} deleted`);
    
          this.logger.log(`User created: ${user.email}`);
    
          return user;
        } catch (error) {
          this.logger.error(`Error creating user ${email}: ${error.message}`);
          throw error;
        }
    }
  
  /**
     * Retrieves a user by their ID.
     * @param id The ID of the user to retrieve.
     * @returns The user with the given ID, or null if no user is found.
     */
  @ApiOperation({ summary: 'Get user by ID' })
  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
     * Retrieves all users.
     * @returns An array of all users.
     */
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  /**
     * Updates a user with the given data.
     * @param id The ID of the user to update.
     * @param data The new data for the user.
     * @returns The updated user.
     */
  @ApiOperation({ summary: 'Update user' })
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

  /**
     * Deletes a user by their ID.
     * @param id The ID of the user to delete.
     * @returns The deleted user.
     */
  @ApiOperation({ summary: 'Delete user' })
  async deleteUser(id: number): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    await this.logsService.logActivity(`User ${user.email} deleted`);

    this.logger.log(`User ${user.email} deleted`);
    return user;
  }
}
