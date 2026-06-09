import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';


@Injectable()
export class GroupsService {
    constructor(
        private readonly prisma: PrismaService,
    ){}
    findAll() {
  return this.prisma.group.findMany({
    include: {
      owner: true,
      ratings: true,
      favorites: true,

      members: {
        include: {
          user: true,
        },
      },
    },
  });
}
async create(
  createGroupDto: CreateGroupDto,
  ownerId: number,
) {

  const group =
    await this.prisma.group.create({
      data: {
        ...createGroupDto,
        ownerId,
      },
    });

  await this.prisma.groupMember.create({
    data: {
      userId: ownerId,
      groupId: group.id,
      role: 'OWNER',
    },
  });

  return group;
}

async getMembers(
  groupId: number,
) {
  return this.prisma.groupMember.findMany({
    where: {
      groupId,
    },

    include: {
      user: true,
    },
  });
}

async addMember(
  groupId: number,
  userId: number,
) {

  const existingMember =
    await this.prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });

  if (existingMember) {
    throw new Error(
      'Utilizador já pertence ao grupo',
    );
  }

  return this.prisma.groupMember.create({
    data: {
      userId,
      groupId,
      role: 'MEMBER',
    },
  });
}

async removeMember(
  groupId: number,
  userId: number,
) {

  return this.prisma.groupMember.delete({
    where: {
      userId_groupId: {
        userId,
        groupId,
      },
    },
  });
}

async isMember(
  groupId: number,
  userId: number,
) {

  const member =
    await this.prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });

  return !!member;
}

async getMyGroups(
  userId: number,
) {
  return this.prisma.group.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },

    include: {
      owner: true,
      ratings: true,
      favorites: true,
    },
  });
}
}
