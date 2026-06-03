import {
  Controller,
  Post,
  Param,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';

import { FavoritesService }
from './favorites.service';

import { JwtAuthGuard }
from '../auth/jwt-auth.guard';

@Controller('favorites')
export class FavoritesController {

  constructor(
    private readonly favoritesService:
      FavoritesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':groupId')
  toggle(
    @Request() req,
    @Param('groupId')
    groupId: string,
  ) {
    return this.favoritesService.toggle(
      req.user.id,
      Number(groupId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  myFavorites(
    @Request() req,
  ) {
    return this.favoritesService.findUserFavorites(
      req.user.id,
    );
  }
}