import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  // constructor(
  //   private dataSource: DataSource,
  //   @InjectRepository(User)
  //   private readonly userRepository: Repository<User>,
  // ) {}

  create(dto: CreateUserDto) {
    // 'This action adds a new user';
    return User.createDto(dto);
  }

  findAll() {
    // `This action returns all user`;
    return User.findAll();
  }

  findOne(id: string) {
    // `This action returns a #${id} user`
    return User.findOneId(id);
  }

  update(id: string, dto: UpdatePasswordDto) {
    // `This action updates a #${id} user`;
    return User.updatePassword(id, dto);
  }

  remove(id: string) {
    // `This action removes a #${id} user`;
    return User.removeId(id);
  }
}
