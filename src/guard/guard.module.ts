import { Module } from '@nestjs/common';
import { GuardService } from './guard.service';
import { GuardController } from './guard.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { LocalStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [GuardController],
  providers: [
    AuthService,
    LocalStrategy,
    GuardService,
    {
      provide: APP_GUARD,
      useClass: GuardService,
    },
  ],
})
export class GuardModule {}
