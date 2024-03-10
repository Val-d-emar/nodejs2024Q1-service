import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { validate } from 'uuid';
import { Response } from 'express';
import { User } from './entities/user.entity';
import { DB } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DB) {}

  create(dto: CreateUserDto) {
    // 'This action adds a new user';
    this.db.users.push(new User(dto));
    const user = this.db.users.at(-1);
    return user.out();
  }

  findAll() {
    // `This action returns all user`;
    const usersOut = [];
    this.db.users.forEach((user) => usersOut.push(user.out()));
    return usersOut;
  }

  findOne(id: string) {
    // `This action returns a #${id} user`
    if (!validate(id)) {
      const error = new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const user = this.db.users.find((user) => user.id === id);
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
    // `This action updates a #${id} user`;
    if (!validate(id)) {
      const error = new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const user = this.db.users.find((user) => user.id === id);
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
    user.version++;
    user.updatedAt = Date.now();
    return user.out();
  }

  remove(id: string, res: Response) {
    // `This action removes a #${id} user`;
    if (!validate(id)) {
      const error = new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const index = this.db.users.findIndex((user) => user.id === id);
    if (index === -1) {
      const error = new HttpException(
        "record with id === userId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    this.db.users.splice(index, 1);
    res.status(HttpStatus.NO_CONTENT).send();
    return;
  }
}
