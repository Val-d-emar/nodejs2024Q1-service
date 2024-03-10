import { OmitType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateUserDto extends OmitType(User, ['id'] as const) {}

// import { User } from '../entities/user.entity';

// import { IsString } from 'class-validator';

// import { v4 } from 'uuid';

// export class UserDto {
//   id: string;
//   @IsString()
//   login: string;
//   @IsString()
//   password: string;
//   version: number;
//   createdAt: number;
//   updatedAt: number;
//   out() {
//     const obj = new UserDto(this);
//     Object.assign(obj, this);
//     obj.password = undefined;
//     return obj;
//   }
//   constructor(obj?: UserDto) {
//     this.id = v4();
//     this.login = obj?.login;
//     this.password = obj?.password;
//     this.version = 1;
//     this.createdAt = Date.now();
//     this.updatedAt = Date.now();
//   }
// }
