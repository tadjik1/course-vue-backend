import { Controller, Get, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Ping')
@Controller('')
export class PingController {
  @ApiOperation({ summary: 'Ping сервера для Health check' })
  @ApiOkResponse({ description: 'pong' })
  @Get('ping')
  ping() {
    return 'pong';
  }
}
