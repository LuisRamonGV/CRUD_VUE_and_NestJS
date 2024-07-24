import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { LogsService } from '../logs/logs.service';

@Module({
  imports: [],
  providers: [UsersService, PrismaService, MailService, LogsService],
  controllers: [UsersController]
})
export class UsersModule {}
