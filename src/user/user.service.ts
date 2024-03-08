import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { validate } from 'uuid';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [];
  create(dto: UserDto) {
    // return 'This action adds a new user';
    this.users.push(new UserDto(dto));
    const user = this.users.at(-1);
    // user.password = undefined;
    return user.out();
  }

  findAll() {
    // return `This action returns all user`;
    const usersOut = [];
    this.users.forEach((user) => usersOut.push(user.out()));
    return usersOut;
  }

  findOne(id: string) {
    // return `This action returns a #${id} user`;findOne(id: string) {
    if (!validate(id)) {
      const error = new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      const error = new HttpException(
        "record with id === userId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    return user.out();
  }

  update(id: string, dto: UpdatePasswordDto) {
    // return `This action updates a #${id} user`;
    if (!validate(id)) {
      const error = new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      const error = new HttpException(
        "record with id === userId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    if (user.password !== dto.oldPassword) {
      const error = new HttpException(
        'oldPassword is wrong',
        HttpStatus.FORBIDDEN,
      );
      throw error;
    }
    user.password = dto.newPassword;
    return user.out();
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
