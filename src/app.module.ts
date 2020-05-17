import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { MeetupsModule } from './meetups/meetups.module';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import config from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    ScheduleModule.forRoot(),
    AuthModule,
    MeetupsModule,
    UsersModule,
    ImagesModule,
    MaintenanceModule,
  ],
})
export class AppModule {}
