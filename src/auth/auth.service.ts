import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findUserByEmail(email);
    if (user?.checkPassword(password)) {
      return user;
    }
    return null;
  }
}
