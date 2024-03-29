import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY + '',
    });
  }

  async validate(authDto: AuthDto) {
    return this.authService.validateUser(authDto);
    // .catch(() => {
    //   throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    // });
  }
}
