import {
  Controller,
  Post,
  UseGuards,
  Body,
  Inject,
  Req,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginGuard } from '../common/guards/login.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from '../users/users.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { UserEntity } from '../users/user.entity';
import { ReqUser } from '../common/decorators/user.decorator';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    errorHttpStatusCode: 422,
    exceptionFactory: (errors) => {
      throw new UnprocessableEntityException(
        Object.values(errors[0].constraints)[0],
      );
    },
    validationError: {
      target: true,
      value: true,
    },
  }),
)
export class AuthController {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}

  @Get('user')
  @UseGuards(AuthenticatedGuard)
  @ApiSecurity('cookie-session')
  @ApiOperation({ summary: 'Получение авторизованного пользователя' })
  @ApiOkResponse({
    description: 'Авторизованный пользователь',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({ description: 'Пользователь неавторизован' })
  async user(@ReqUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @UseGuards(LoginGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Авторизация по логину и паролю с сохранением в сессии',
  })
  async login(
    @ReqUser() user: UserEntity,
    @Body() loginDto: LoginDto, // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<UserEntity> {
    return user;
  }

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout пользователя' })
  logout(@Req() req) {
    req.logout();
  }
}
