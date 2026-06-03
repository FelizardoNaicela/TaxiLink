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
},
  });
}
create(
  createGroupDto: CreateGroupDto,

  ownerId: number,
) {
  return this.prisma.group.create({
    data: {
      ...createGroupDto,

      ownerId,
    },
  });
}
}
