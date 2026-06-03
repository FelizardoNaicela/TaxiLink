import { Injectable } from '@nestjs/common';

import { PrismaService }
from '../prisma/prisma.service';

@Injectable()
export class RatingsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
  userId: number,
  groupId: number,
  value: number,
) {

  const existingRating =
    await this.prisma.rating.findFirst({
      where: {
        userId,
        groupId,
      },
    });

  if (existingRating) {
    return this.prisma.rating.update({
      where: {
        id: existingRating.id,
      },
      data: {
        value,
      },
    });
  }

  return this.prisma.rating.create({
    data: {
      value,
      groupId,
      userId,
    },
  });
}
}