import { Module } from '@nestjs/common';
import { PingModule } from './ping/ping.module';
import { UsersModule } from './users/users.module';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import config from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    PingModule,
    UsersModule,
  ],
})
export class AppModule {}
