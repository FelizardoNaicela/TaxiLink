import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { create } from 'domain';
import { Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ){}

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Post()
        create(
        @Body() createUserDto: CreateUserDto,
        ){ return this.userService.create(
            createUserDto,
        )};

        @Get('search')
search(
  @Query('search')
  query: string,
) {
  return this.userService.search(
    query,
  );
}

@Get('phone/:phone')
findByPhone(
  @Param('phone')
  phone: string,
) {
  return this.userService.findByPhone(
    phone,
  );
}
}
