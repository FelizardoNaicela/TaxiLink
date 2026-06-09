import { BadRequestException, Injectable } from '@nestjs/common';
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

  if (
    createUserDto.role === 'DRIVER' &&
    !createUserDto.phone
  ) {
    throw new Error(
      'Motoristas devem informar telefone',
    );
  }

  if (
  createUserDto.role === 'DRIVER' &&
  !createUserDto.phone
) {
  throw new Error(
    'Telefone é obrigatório para taxistas',
  );
}
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

search(
  query: string,
) {
  return this.prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
          },
        },

        {
          email: {
            contains: query,
          },
        },

        {
          phone: {
            contains: query,
          },
        },
      ],
    },
  });
}

findByPhone(phone: string) {
  return this.prisma.user.findUnique({
    where: {
      phone,
    },
  });
}
}
