import { 
    Controller,
    Body,
    Get,
    Post
 } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { create } from 'domain';

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
}
