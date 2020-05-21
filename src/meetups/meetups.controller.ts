import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
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
import { CreateMeetupDto } from './dto/create-meetup.dto';

@ApiTags('Meetups')
@Controller('meetups')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    errorHttpStatusCode: 422,
    validationError: {
      target: true,
      value: true,
    },
  }),
)
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

  @Post()
  @UseGuards(AuthenticatedGuard)
  @ApiSecurity('cookie-session')
  @ApiOperation({ summary: 'Создание нового митапа' })
  async createMeetup(
    @Body() meetupDto: CreateMeetupDto,
    @ReqUser() user: UserEntity,
  ): Promise<MeetupWithAgendaDto> {
    return this.meetupService.createMeetup(meetupDto, user);
  }

  @Put(':meetupId')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Обновление митапа' })
  @ApiSecurity('cookie-session')
  async updateMeetup(
    @ReqUser() user: UserEntity,
    @Param('meetupId', ParseIntPipe) meetupId: number,
    @Body() meetupDto: CreateMeetupDto,
  ): Promise<MeetupWithAgendaDto> {
    return this.meetupService.updateMeetup(meetupId, meetupDto, user);
  }

  @Delete(':meetupId')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Удаление митапа' })
  @ApiSecurity('cookie-session')
  async deleteMeetup(@Param('meetupId', ParseIntPipe) meetupId: number) {
    return this.meetupService.deleteMeetup(meetupId);
  }

  @Put(':meetupId/participation')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({
    summary: 'Добавление текущего пользователя в список участников митапа',
  })
  @ApiSecurity('cookie-session')
  async attendMeetup(
    @Param('meetupId', ParseIntPipe) meetupId: number,
    @ReqUser() user: UserEntity,
  ) {
    return this.meetupService.attendMeetup(meetupId, user);
  }

  @Delete(':meetupId/participation')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({
    summary: 'Удаление текущего пользователя в список участников митапа',
  })
  @ApiSecurity('cookie-session')
  async leaveMeetup(
    @Param('meetupId', ParseIntPipe) meetupId: number,
    @ReqUser() user: UserEntity,
  ) {
    return this.meetupService.leaveMeetup(meetupId, user);
  }
}
