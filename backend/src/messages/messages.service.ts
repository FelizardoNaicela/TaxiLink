import { Injectable, ForbiddenException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateMessageDto } from './dto/create-message.dto';
import { ChatGateway } from '../chat/chat.gateway';



@Injectable()
export class MessagesService {
  constructor(
  private readonly prisma: PrismaService,

  private readonly chatGateway: ChatGateway,
) {}


  async create(
  createMessageDto: CreateMessageDto,
  userId: number,
) {

  const member =
    await this.prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId:
            createMessageDto.groupId,
        },
      },
    });

  if (!member) {
    throw new ForbiddenException(
      'Não pertence ao grupo',
    );
  }
  const user =
    await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (user?.role === 'CLIENT') {
  throw new ForbiddenException(
    'Clientes não podem enviar mensagens',
  );
}

  return this.prisma.message.create({
    data: {
      content:
        createMessageDto.content,
      groupId:
        createMessageDto.groupId,
      userId,
    },

    include: {
      user: true,
      group: true,
    },
  });
}

findByGroup(groupId: number) {
  return this.prisma.message.findMany({
    where: {
      groupId,
    },

    include: {
      user: true,
    },

    orderBy: {
      createdAt: 'asc',
    },
  });
}

  findAll() {
    return this.prisma.message.findMany({
      include: {
        user: true,

        group: true,
      },
    });
  }
}