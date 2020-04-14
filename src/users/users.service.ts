import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { EntityRepository } from 'mikro-orm';
import { InjectRepository } from 'nestjs-mikro-orm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: EntityRepository<UserEntity>,
  ) {}

  async findUserById(userId) {
    return this.usersRepository.findOne({ id: userId });
  }

  async findUserByEmail(email) {
    return this.usersRepository.findOne({ email });
  }

  async createUser(registerUserDto: RegisterUserDto) {
    const user = new UserEntity(registerUserDto);
    await this.usersRepository.persistAndFlush(user);
    return user;
  }
}
