import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PingModule } from './ping/ping.module';
import { UsersModule } from './users/users.module';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import config from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    PingModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}