import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    findAll(){
        return this.prisma.user.findMany()
    }

    async create(
  createUserDto: CreateUserDto,
) {
  const hashedPassword =
    await bcrypt.hash(
      createUserDto.password,
      10,
    );

  return this.prisma.user.create({
  data: {
    ...createUserDto,
    password: hashedPassword,
  },
});
}

findByEmail(email: string){
    return this.prisma.user.findUnique({
        where:{
            email,
        },
    });
}
}
