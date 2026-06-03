import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user =
      await this.usersService.findByEmail(
        loginDto.email,
      );

    if (!user) {
      throw new UnauthorizedException(
        'Credentiais invalidas',
      );
    }

    const passwordMatches =
      await bcrypt.compare(
        loginDto.password,
        user.password,
      );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Credentiais invalidas',
      );
    }

   const payload = {
  sub: user.id,
  id: user.id,
  email: user.email,
  role: user.role,
  province: user.province,
  name: user.name,
};

    const accessToken =
      await this.jwtService.signAsync(
        payload,
      );

    return {
  accessToken,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    province: user.province,
  },
};
  }
}