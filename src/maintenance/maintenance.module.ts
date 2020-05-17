import { Module } from '@nestjs/common';
import { DatabaseManager } from './database-manager';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';

@Module({
  controllers: [MaintenanceController],
  providers: [
    {
      provide: 'DATABASE_MANAGER',
      useValue: new DatabaseManager(),
    },
    MaintenanceService,
  ],
})
export class MaintenanceModule {}
