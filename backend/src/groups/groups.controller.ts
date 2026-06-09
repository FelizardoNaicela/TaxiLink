import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddMemberDto }
from './dto/add-member.dto';

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

@UseGuards(JwtAuthGuard)
@Get(':id/members')
getMembers(
  @Param('id') id: string,
) {
  return this.groupsService.getMembers(
    Number(id),
  );
}

@UseGuards(JwtAuthGuard)
@Post(':id/members')
addMember(
  @Param('id') id: string,

  @Body()
  addMemberDto: AddMemberDto,
) {
  return this.groupsService.addMember(
    Number(id),
    addMemberDto.userId,
  );
}

@UseGuards(JwtAuthGuard)
@Delete(':id/members/:userId')
removeMember(
  @Param('id') id: string,

  @Param('userId')
  userId: string,
) {
  return this.groupsService.removeMember(
    Number(id),
    Number(userId),
  );
}

@Get(':id/is-member')
@UseGuards(JwtAuthGuard)
isMember(
  @Param('id') id: string,

  @Req() request: any,
) {
  return this.groupsService.isMember(
    Number(id),
    request.user.id,
  );
}
}

