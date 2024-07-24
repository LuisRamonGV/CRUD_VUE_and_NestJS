import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService
) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async createUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.getUserById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user'})
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user'})
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }

  @Post('send-test-email')
  @ApiOperation({ summary: 'endpoint email sending tests'})
  async sendTestEmail(@Body('email') email: string) {
    await this.mailService.sendWelcomeEmail(email);
    return { message: 'Test email sent successfully' };
  }
}
