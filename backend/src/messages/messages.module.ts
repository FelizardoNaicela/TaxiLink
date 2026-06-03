import { Module } from '@nestjs/common';

import { MessagesController } from './messages.controller';

import { MessagesService } from './messages.service';

import { PrismaModule } from '../prisma/prisma.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [PrismaModule, ChatModule],

  controllers: [MessagesController],

  providers: [MessagesService],
})
export class MessagesModule {}