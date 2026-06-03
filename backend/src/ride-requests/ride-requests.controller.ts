import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard }
from '../auth/jwt-auth.guard';

import { RideRequestsService }
from './ride-requests.service';

import { CreateRideRequestDto }
from './dto/create-ride-request.dto';

@Controller('ride-requests')
export class RideRequestsController {

  constructor(
    private readonly service:
      RideRequestsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    dto: CreateRideRequestDto,

    @Req()
    req: any,
  ) {
    return this.service.create(
      dto,
      req.user.id,
    );
  }

  @Get('group/:groupId')
  findByGroup(
    @Param('groupId')
    groupId: string,
  ) {
    return this.service.findByGroup(
      Number(groupId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/accept')
  accept(
    @Param('id')
    id: string,

    @Req()
    req: any,
  ) {
    return this.service.accept(
      Number(id),
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
@Post(':id/finish')
finish(
  @Param('id')
  id: string,
) {
  return this.service.finish(
    Number(id),
  );
}
}