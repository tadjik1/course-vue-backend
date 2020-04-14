import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { UserEntity } from './user.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [UserEntity] })],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
