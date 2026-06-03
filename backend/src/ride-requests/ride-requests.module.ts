import { Module } from '@nestjs/common';

import { PrismaService }
from '../prisma/prisma.service';

import { RideRequestsController }
from './ride-requests.controller';

import { RideRequestsService }
from './ride-requests.service';

@Module({
  controllers: [
    RideRequestsController,
  ],

  providers: [
    RideRequestsService,
    PrismaService,
  ],
})
export class RideRequestsModule {}