import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService
) {}

  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.getUserById(id);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }

  // TEST
  @Post('send-test-email')
  async sendTestEmail(@Body('email') email: string) {
    await this.mailService.sendWelcomeEmail(email);
    return { message: 'Test email sent successfully' };
  }
}
