import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard }
from '../auth/jwt-auth.guard';

import { RatingsService }
from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(
    private ratingsService:
      RatingsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() body: any,
    @Req() request: any,
  ) {
    return this.ratingsService.create(
      request.user.id,
      body.groupId,
      body.value,
    );
  }
}