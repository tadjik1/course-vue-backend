import { Controller, Inject } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Meetups')
@Controller('meetups')
export class MeetupsController {
  constructor(
    @Inject(MeetupsService) private readonly meetupService: MeetupsService,
  ) {}
}
