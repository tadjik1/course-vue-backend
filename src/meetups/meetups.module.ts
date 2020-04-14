import { Module } from '@nestjs/common';
import { MeetupsController } from './meetups.controller';
import { MeetupsService } from './meetups.service';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { MeetupEntity } from './entities/meetup.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [MeetupEntity] })],
  controllers: [MeetupsController],
  providers: [MeetupsService],
})
export class MeetupsModule {}
