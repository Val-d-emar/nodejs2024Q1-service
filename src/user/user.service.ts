import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService {
  create(dto: CreateUserDto) {
    // 'This action adds a new user';
    return User.createDto(dto);
  }

  findAll() {
    // `This action returns all user`;
    return User.findAll();
  }

  async findOne(id: string) {
    // `This action returns a #${id} user`
    return User.findOneId(id).then((u) => u.out());
  }

  update(id: string, dto: UpdatePasswordDto) {
    // `This action updates a #${id} user`;
    return User.updatePassword(id, dto);
  }

  remove(id: string) {
    // `This action removes a #${id} user`;
    return User.removeId(id);
  }
  findOneBy(authDto: AuthDto) {
    // `This action returns a #${id} user`
    return User.findOneBy({
      login: authDto.login,
      password: authDto.password,
    });
  }
}
