import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async create(dto: CreateUserDto) {
    // 'This action adds a new user';
    const pass = await bcrypt.hash(
      dto.password,
      parseInt(process.env.CRYPT_SALT) || 10,
    );
    dto.password = pass;
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
  async findOneBy(authDto: AuthDto) {
    // `This action returns a #${id} user`
    // return User.findOneBy({
    //   login: authDto.login,
    //   password: authDto.password,
    // })
    const users = await User.findBy({
      login: authDto.login,
    });
    for (const user of users) {
      const isMatch = await bcrypt.compare(authDto.password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }
}
