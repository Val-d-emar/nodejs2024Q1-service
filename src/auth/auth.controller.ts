// import { Body, Controller, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthDto } from './dto/auth.dto';
// import { RefreshToken } from './dto/refreshToken.dto';

// @Controller('auth/')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('signup')
//   signup(@Body() authDto: AuthDto) {
//     return this.authService.signup(authDto);
//   }

//   @Post('login')
//   login(@Body() authDto: AuthDto) {
//     return this.authService.login(authDto);
//   }

//   @Post('refresh')
//   refresh(@Body() refreshToken: RefreshToken) {
//     return this.authService.refresh(refreshToken);
//   }
// }
import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshToken } from './dto/refreshToken.dto';

@Controller('auth') // Указываем необязательный префикс
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe()) // Добавляем пайп с валидацией
  @Post('signup')
  public async signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto).then((result) => {
      if (!result.success) {
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
      }
    });
  }

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('refresh')
  refresh(@Body() refreshToken: RefreshToken) {
    return this.authService.refresh(refreshToken);
  }
}
