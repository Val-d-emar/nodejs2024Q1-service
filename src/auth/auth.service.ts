import { AuthDto } from './dto/auth.dto';
import { RefreshToken } from './dto/refreshToken.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { appError } from 'src/errors';
import { Payload } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(authDto: AuthDto) {
    return this.userService.create(authDto as CreateUserDto).then((user) => {
      if (user) {
        return {
          id: user.id,
        };
      } else {
        throw new HttpException(
          'dto is invalid (no login or password, or they are not a strings)',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }

  async login(authDto: AuthDto) {
    return this.validateUser(authDto).then((user: User) => {
      if (user) {
        const payload = { login: user.login, userId: user.id };
        return this._createToken(payload);
      } else {
        appError('Incorrect login or password', HttpStatus.FORBIDDEN);
      }
    });
  }

  async validateUser(authDto: AuthDto) {
    return this.userService
      .findOneBy(authDto)
      .catch(() => appError('', HttpStatus.UNAUTHORIZED));
  }

  refresh(refreshToken: RefreshToken) {
    return refreshToken;
  }

  private _createToken(payload: Payload): any {
    return {
      // expires: process.env.TOKEN_EXPIRE_TIME + '',
      accessToken: this.jwtService.sign(JSON.parse(JSON.stringify(payload))),
      refreshToken: 'refreshToken',
    };
  }
}
