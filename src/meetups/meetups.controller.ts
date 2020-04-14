import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { MeetupDto } from './dto/meetup.dto';
import { MeetupWithAgendaDto } from './dto/meetup-with-agenda.dto';
import { UserEntity } from '../users/user.entity';
import { ReqUser } from '../common/decorators/user.decorator';

@ApiTags('Meetups')
@Controller('meetups')
export class MeetupsController {
  constructor(
    @Inject(MeetupsService) private readonly meetupService: MeetupsService,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Получение списка всех митапов' })
  async findAll(@ReqUser() user: UserEntity): Promise<MeetupDto[]> {
    return this.meetupService.findAll(user);
  }

  @Get(':meetupId')
  @ApiOperation({
    summary: 'Получение подробной инфомрации о митапе по ID',
  })
  @ApiNotFoundResponse({ description: 'Отсутствует митап с таким ID' })
  async findById(
    @Param('meetupId', ParseIntPipe) meetupId: number,
    @ReqUser() user: UserEntity,
  ) {
    return this.meetupService.findById(meetupId, user);
  }


}
