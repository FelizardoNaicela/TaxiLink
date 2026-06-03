import { Injectable } from '@nestjs/common';

import { PrismaService }
from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async toggle(
    userId: number,
    groupId: number,
  ) {

    const favorite =
      await this.prisma.favorite.findFirst({
        where: {
          userId,
          groupId,
        },
      });

    if (favorite) {

      await this.prisma.favorite.delete({
        where: {
          id: favorite.id,
        },
      });

      return {
        favorite: false,
      };
    }

    await this.prisma.favorite.create({
      data: {
        userId,
        groupId,
      },
    });

    return {
      favorite: true,
    };
  }

  findUserFavorites(
    userId: number,
  ) {
    return this.prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        group: true,
      },
    });
  }
}