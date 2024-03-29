import { AuthDto } from './dto/auth.dto';
import { RefreshToken } from './dto/refreshToken.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(authDto: AuthDto) {
    return this.userService
      .create(authDto as CreateUserDto)
      .then(() => {
        return {
          success: true,
          message: 'user registered',
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err,
        };
      });
  }

  async login(authDto: AuthDto) {
    return this.userService.findOneBy(authDto).then((user: User) => {
      return {
        login: user.login,
        ...this._createToken(user),
      };
    });
  }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.userService.findOneBy(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async validateUser(authDto: AuthDto) {
    return this.userService.findOneBy(authDto).catch(() => {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    });
  }

  refresh(refreshToken: RefreshToken) {
    return refreshToken;
  }

  private _createToken(authDto: AuthDto): any {
    return {
      expires: process.env.TOKEN_EXPIRE_TIME + '',
      token: this.jwtService.sign(authDto),
    };
  }
}
