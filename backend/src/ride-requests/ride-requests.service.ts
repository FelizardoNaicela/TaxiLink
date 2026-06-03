import { Injectable } from '@nestjs/common';

import { PrismaService }
from '../prisma/prisma.service';

import { CreateRideRequestDto }
from './dto/create-ride-request.dto';

@Injectable()
export class RideRequestsService {

  constructor(
    private prisma: PrismaService,
  ) {}

  create(
    dto: CreateRideRequestDto,
    clientId: number,
  ) {
    return this.prisma.rideRequest.create({
      data: {
        description:
          dto.description,

        groupId:
          dto.groupId,

        clientId,

        status: 'PENDING',
      },
    });
  }

  findByGroup(
    groupId: number,
  ) {
    return this.prisma.rideRequest.findMany({
      where: {
        groupId,
      },

      include: {
        client: true,
        driver: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async accept(
    requestId: number,
    driverId: number,
  ) {

    const request =
      await this.prisma.rideRequest.update({
        where: {
          id: requestId,
        },

        data: {
          status: 'ACCEPTED',
          driverId,
        },

        include: {
          group: true,
        },
      });

    await this.prisma.group.update({
      where: {
        id: request.groupId,
      },

      data: {
        onlineDrivers: {
          decrement: 1,
        },
      },
    });

    return request;
  }
  async finish(requestId: number) {

  const request =
    await this.prisma.rideRequest.update({
      where: {
        id: requestId,
      },

      data: {
        status: 'FINISHED',
      },
    });

  await this.prisma.group.update({
    where: {
      id: request.groupId,
    },

    data: {
      onlineDrivers: {
        increment: 1,
      },
    },
  });

  return request;
}
}