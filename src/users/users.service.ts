import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { EntityManager, EntityRepository } from 'mikro-orm';
import { InjectRepository } from 'nestjs-mikro-orm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: EntityRepository<UserEntity>,
    private readonly em: EntityManager,
  ) {}

  async findUserById(userId: number) {
    this.em.clear();
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
