import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('groups')
export class GroupsController {
    constructor(
        private readonly groupsService: GroupsService
    ){}
@UseGuards(JwtAuthGuard)

@Get()
findAll() {
    return this.groupsService.findAll();
}

@UseGuards(JwtAuthGuard)

@Post()
create(
  @Body()
  createGroupDto: CreateGroupDto,

  @Req() request: any,
) {
  return this.groupsService.create(
    createGroupDto,
    request.user.id,
  );
}

}

