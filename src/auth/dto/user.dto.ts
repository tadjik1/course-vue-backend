import { UserEntity } from '../../users/user.entity';

export class UserDto
  implements Pick<UserEntity, 'id' | 'fullname' | 'email' | 'avatar'> {
  readonly id: number;
  readonly fullname: string;
  readonly email: string;
  readonly avatar: string;

  constructor(user: Partial<UserEntity>) {
    this.id = user.id;
    this.fullname = user.fullname;
    this.email = user.email;
    this.avatar = user.avatar;
  }
}
