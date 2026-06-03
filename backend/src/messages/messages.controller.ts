import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { MessagesService } from './messages.service';

import { CreateMessageDto } from './dto/create-message.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { Param } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    createMessageDto: CreateMessageDto,

    @Req() request: any,
  ) {
    return this.messagesService.create(
      createMessageDto,

      request.user.id,
    );
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get('group/:groupId')
findByGroup(
  @Param('groupId') groupId: string,
) {
  return this.messagesService.findByGroup(
    Number(groupId),
  );
}
}