import {
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Query,
} from '@nestjs/common';
import { EntityManager } from 'mikro-orm';
import { DatabaseManager } from './database-manager';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MaintenanceService } from './maintenance.service';

@ApiTags('maintenance')
@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @ApiOperation({ summary: 'Регенерация БД' })
  @ApiQuery({
    name: 'admin_key',
    description: 'Ключ администратора',
    example: 'admin_key',
  })
  @Get('db-refresh')
  async refreshDatabase(@Query('admin_key') adminKey: string) {
    if (adminKey !== 'admin_key') {
      throw new ForbiddenException('admin_key query parameter is not valid');
    }
    await this.maintenanceService.dbRefresh();
    return 'Done';
  }

  @ApiOperation({ summary: 'Ping сервера для Health check' })
  @ApiOkResponse({ description: 'pong' })
  @Get('ping')
  ping() {
    return this.maintenanceService.ping();
  }
}
