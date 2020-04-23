import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findUserById(userId: number) {
    return this.usersRepository.findOne(userId);
  }

  async findUserByEmail(email) {
    return this.usersRepository.findOne({ email });
  }

  async createUser(registerUserDto: RegisterUserDto) {
    const existUser = await this.usersRepository.findOne({
      email: registerUserDto.email,
    });
    if (existUser) {
      throw new BadRequestException(
        'Пользователь с таким Email уже существует',
      );
    }
    const user = new UserEntity(registerUserDto);
    await this.usersRepository.persistAndFlush(user);
    return user;
  }
}
