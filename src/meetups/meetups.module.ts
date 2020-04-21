import { Module } from '@nestjs/common';
import { MeetupsController } from './meetups.controller';
import { MeetupsService } from './meetups.service';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { MeetupEntity } from './entities/meetup.entity';
import { ImageEntity } from '../images/image.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [MeetupEntity, ImageEntity] }),
  ],
  controllers: [MeetupsController],
  providers: [MeetupsService],
})
export class MeetupsModule {}
